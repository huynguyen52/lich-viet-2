import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '../components/DateTimePicker';
import { db } from '../firebase';
import { setFormValue } from '../redux/actions/eventActions';

const getTimeAfter = (myDate: Date) => {
  myDate.setHours(myDate.getHours() + 1);
  return myDate;
};

function Modal(props: any) {
  const { navigation, route } = props;
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: any) => state.event.selectedDate);
  const eventListState = useSelector((state: any) => state.event.eventList);
  const [inputForm, setInputForm] = useState<any>({
    id: '',
    title: '',
    location: '',
    isAllDay: false,
    textAre: '',
    dateTimePickerValue: {
      startTime: new Date(),
      startDate: new Date(selectedDate.timestamp),
      endTime: getTimeAfter(new Date()),
      endDate: new Date(selectedDate.timestamp),
    },
  });

  useEffect(() => {
    if (isEdit) {
      const editableEvent = eventListState.find(
        (e: any) => e.id === route.params.event.id
      );
      console.log(editableEvent);
      const time = editableEvent.isAllDay
        ? {
            startTime: new Date(),
            startDate: editableEvent.time.startDate,
            endTime: getTimeAfter(new Date()),
            endDate: editableEvent.time.endDate,
          }
        : {
            startTime: editableEvent.time.startTime,
            startDate: editableEvent.time.startDate,
            endTime: editableEvent.time.endTime,
            endDate: editableEvent.time.endDate,
          };
      setInputForm({
        id: editableEvent.id,
        isAllDay: editableEvent.isAllDay,
        location: editableEvent.location,
        title: editableEvent.title,
        textAre: editableEvent.notes,
        dateTimePickerValue: {
          ...time,
        },
      });
    }
  }, [isEdit]);

  useEffect(() => {
    if (route.params) {
      setIsEdit(true);
    }
  }, []);

  useEffect(() => {
    dispatch(setFormValue(inputForm));
  }, [inputForm]);

  const getData = async () => {
    const eventsCol = collection(db, 'events');
    const evnetSnapshot = await getDocs(eventsCol);
    const eventList = evnetSnapshot.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddEvent = async () => {
    await addDoc(collection(db, 'events'), {
      title: inputForm.title,
      location: inputForm.location,
      notes: inputForm.textAre,
      time: {
        startTime: inputForm.dateTimePickerValue.startTime,
        startDate: inputForm.dateTimePickerValue.startDate,
        endTime: inputForm.dateTimePickerValue.endTime,
        endDate: inputForm.dateTimePickerValue.endDate,
      },
    });
  };

  const onDatePickerChange = (e: any, date: Date, type: string) => {
    switch (type) {
      case 'startTime':
        return setInputForm({
          ...inputForm,
          dateTimePickerValue: {
            ...inputForm.dateTimePickerValue,
            startTime: date,
          },
        });
      case 'startDate':
        return setInputForm({
          ...inputForm,
          dateTimePickerValue: {
            ...inputForm.dateTimePickerValue,
            startDate: date,
          },
        });
      case 'endTime':
        return setInputForm({
          ...inputForm,
          dateTimePickerValue: {
            ...inputForm.dateTimePickerValue,
            endTime: date,
          },
        });
      case 'endDate':
        return setInputForm({
          ...inputForm,
          dateTimePickerValue: {
            ...inputForm.dateTimePickerValue,
            endDate: date,
          },
        });
      default:
        return;
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.modal}>
            <View style={{ ...styles.card, marginBottom: 32 }}>
              <View style={styles.cardContent}>
                <TextInput
                  style={{ ...styles.input, borderBottomWidth: 1 }}
                  placeholder="Tiêu đề "
                  value={inputForm.title}
                  onChangeText={(text) =>
                    setInputForm({ ...inputForm, title: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  value={inputForm.location}
                  placeholder="Vị trí "
                  onChangeText={(text) =>
                    setInputForm({ ...inputForm, location: text })
                  }
                />
              </View>
            </View>

            <View style={{ ...styles.card, marginBottom: 32 }}>
              <View style={styles.cardContent}>
                <View style={styles.row}>
                  <Text style={styles.text}>Cả ngày</Text>
                  <Switch
                    trackColor={{ false: '#f4f3f4', true: '#5BC236' }}
                    onValueChange={() =>
                      setInputForm({
                        ...inputForm,
                        isAllDay: !inputForm.isAllDay,
                      })
                    }
                    value={inputForm.isAllDay}
                  />
                </View>
                <DateTimePicker
                  inputForm={inputForm}
                  onDatePickerChange={onDatePickerChange}
                />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <TextInput
                  style={{ ...styles.input, minHeight: 200 }}
                  placeholder="Ghi chú"
                  multiline={true}
                  numberOfLines={4}
                  value={inputForm.textAre}
                  onChangeText={(text) =>
                    setInputForm({ ...inputForm, textAre: text })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 14,
    flex: 1,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  cardContent: {},
  input: {
    paddingVertical: 8,
    fontSize: 18,
    // borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginRight: 'auto',
  },
  picker: {
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
});

export default Modal;
