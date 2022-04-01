import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePicker from '../components/DateTimePicker';

const currentDate = () => {
  const myDate = new Date();
  myDate.setHours(myDate.getHours() + 1);
  return myDate;
};

function Modal() {
  const [inputForm, setInputForm] = useState({
    title: '',
    location: '',
    isAllDay: false,
    textAre: '',
    dateTimePickerValue: {
      startTime: new Date(),
      startDate: new Date(),
      endTime: currentDate(),
      endDate: currentDate(),
    },
  });

  const onDatePickerChange = () => {};

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
                />
                <TextInput
                  style={styles.input}
                  value={inputForm.location}
                  placeholder="Vị trí "
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
                  dateTimePickerValue={inputForm.dateTimePickerValue}
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
