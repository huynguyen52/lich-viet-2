import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import EventBar from '../components/EventBar';
import { db } from '../firebase';
import { deleteEvent } from '../redux/actions/eventActions';

function EventDetail(props: any) {
  const { navigation } = props;
  const { route } = props;
  const { id } = route.params.event;
  const eventList = useSelector((state: any) => state.event.eventList);
  const [event, setEvent] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {
    const newEvent = eventList.find((e: any) => e.id === id);
    newEvent && setEvent(newEvent);
  }, [route]);

  const handleDeleteEvent = async () => {
    const docRef = doc(db, 'events', event.id);
    deleteDoc(docRef);
    dispatch(deleteEvent(event.id));
    navigation.navigate('Home');
  };

  const showConfirmDialog = () => {
    Alert.alert('Xóa sự kiện', 'Bạn có chắc chắn muốn xoá sự kiện này không?', [
      {
        text: 'Đồng ý',
        onPress: handleDeleteEvent,
      },
      {
        text: 'Hủy',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventSubTitle}>{event.location}</Text>
          <Text style={styles.eventDesc}>
            {event.isAllDay && 'Cả ngày '}
            {`từ ${new Date(event.time?.startDate).toLocaleDateString('vi-VI', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })} đến ${new Date(event.time?.endDate).toLocaleDateString(
              'vi-VI',
              {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )}`}
          </Text>
          <View style={{ marginTop: 20 }}></View>
          <EventBar style={styles.eventExtra} event="Lịch" time="Không có" />
          <EventBar
            style={styles.eventExtra}
            event="Cảnh báo"
            time="Không có"
          />
          {event.notes !== '' && (
            <View style={styles.row}>
              <Text style={styles.title}>Ghi chú</Text>
              <Text style={styles.desc}>{event.notes}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={showConfirmDialog}>
          <Text style={styles.text}>Xóa sự kiện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 14,
    flex: 1,
    height: '100%',
  },
  row: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  desc: {
    marginTop: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  eventSubTitle: {
    fontSize: 12,
    color: '#000',
    marginBottom: 16,
  },
  eventDesc: {
    fontSize: 16,
    color: '#3A3845',
  },
  eventExtra: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  text: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default EventDetail;
