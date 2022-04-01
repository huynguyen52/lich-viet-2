import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CalendarComponent from '../components/Calendar';
import EventBar from '../components/EventBar';

function Home() {
  const currentEvents = useSelector((state: any) => state.event.currentEvents);
  console.log(currentEvents);

  return (
    <View style={{}}>
      <CalendarComponent />
      <View style={styles.eventBarContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 8 }}
          data={currentEvents}
          renderItem={({ item }) => (
            <EventBar color={item.color} event={item.title} time={item.time} />
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
});

export default Home;
