import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CalendarComponent from '../components/Calendar';
import EventBar from '../components/EventBar';
import { db } from '../firebase';
import { setEventList } from '../redux/actions/eventActions';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

function Home(props: any) {
  const { navigation } = props;
  const dailyEvents = useSelector((state: any) => state.event.dailyEvents);
  const eventList = useSelector((state: any) => state.event.eventList);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const eventsCol = collection(db, 'events');
      const evnetSnapshot = await getDocs(eventsCol);
      const data = evnetSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const eventList = data.map((item: any) => {
        const time = item.time.startTime
          ? {
              endDate: new Date(item.time.endDate.seconds * 1000),
              endTime: new Date(item.time.endTime.seconds * 1000),
              startDate: new Date(item.time.startDate.seconds * 1000),
              startTime: new Date(item.time.startTime.seconds * 1000),
            }
          : {
              endDate: new Date(item.time.endDate.seconds * 1000),
              startDate: new Date(item.time.startDate.seconds * 1000),
            };
        return {
          id: item.id,
          location: item.location,
          notes: item.notes,
          time,
          title: item.title,
          isAllDay: item.isAllDay,
        };
      });
      dispatch(setEventList(eventList));
    };
    getData();
  }, []);

  return (
    <View style={{}}>
      <CalendarComponent />
      <View style={styles.eventBarContainer}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 8,
          }}
          data={dailyEvents}
          renderItem={({ item }) => (
            <EventBar
              color={item.color}
              event={item.title}
              time={item.time}
              onPress={() =>
                navigation.navigate('EventDetail', { event: item })
              }
              borderLeft
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={FlatListItemSeparator}
        />
      </View>
    </View>
  );
}

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#ddd',
      }}
    />
  );
};

const styles = StyleSheet.create({
  eventBarContainer: {},
  background: {
    flex: 1,
    width: '100%',
  },
});

export default Home;
