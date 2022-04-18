import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const typeDatePicker = {
  START_TIME: 'START_TIME',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  END_TIME: 'END_TIME',
};

interface DatePickerShow {
  startTime: boolean;
  startDate: boolean;
  endTime: boolean;
  endDate: boolean;
}

function DateTimePicker(props: any) {
  const { onDatePickerChange, inputForm } = props;
  const { dateTimePickerValue } = inputForm;
  const { isAllDay } = inputForm;

  const [isDatePickerShow, setIsDatePickerShow] = useState<DatePickerShow>(
    {} as DatePickerShow
  );

  const toggleDatePickerShow = (type: string) => {
    setIsDatePickerShow({
      startTime: false,
      startDate: false,
      endTime: false,
      endDate: false,
    });
    switch (type) {
      case typeDatePicker.START_TIME:
        setIsDatePickerShow((prev) => ({
          ...prev,
          startTime: !isDatePickerShow.startTime,
        }));
        break;
      case typeDatePicker.START_DATE:
        setIsDatePickerShow((prev) => ({
          ...prev,
          startDate: !isDatePickerShow.startDate,
        }));
        break;
      case typeDatePicker.END_TIME:
        setIsDatePickerShow((prev) => ({
          ...prev,
          endTime: !isDatePickerShow.endTime,
        }));
        break;
      case typeDatePicker.END_DATE:
        setIsDatePickerShow((prev) => ({
          ...prev,
          endDate: !isDatePickerShow.endDate,
        }));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.text}>Bắt đầu</Text>
        <TouchableOpacity
          onPress={() => toggleDatePickerShow(typeDatePicker.START_TIME)}
          style={{ display: isAllDay ? 'none' : 'flex' }}
        >
          <Text style={styles.picker}>
            {getTime(dateTimePickerValue.startTime)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleDatePickerShow(typeDatePicker.START_DATE)}
        >
          <Text style={{ ...styles.picker, marginLeft: 8 }}>
            {dateTimePickerValue.startDate.toDateString()}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: isDatePickerShow.startDate ? 'flex' : 'none',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateTimePickerValue.startDate}
          mode="date"
          display="inline"
          onChange={(e, date) => onDatePickerChange(e, date, 'startDate')}
        />
      </View>
      <View
        style={{
          display: isDatePickerShow.startTime ? 'flex' : 'none',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateTimePickerValue.startTime}
          mode="time"
          display="spinner"
          onChange={(e: any, date: any) =>
            onDatePickerChange(e, date, 'startTime')
          }
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Kết thúc</Text>
        <TouchableOpacity
          onPress={() => toggleDatePickerShow(typeDatePicker.END_TIME)}
          style={{ display: isAllDay ? 'none' : 'flex' }}
        >
          <Text style={styles.picker}>
            {getTime(dateTimePickerValue.endTime)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleDatePickerShow(typeDatePicker.END_DATE)}
        >
          <Text style={{ ...styles.picker, marginLeft: 8 }}>
            {dateTimePickerValue.endDate.toDateString()}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: isDatePickerShow.endDate ? 'flex' : 'none',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateTimePickerValue.endDate}
          mode="date"
          display="inline"
          onChange={(e: any, date: any) =>
            onDatePickerChange(e, date, 'endDate')
          }
        />
      </View>
      <View
        style={{
          display: isDatePickerShow.endTime ? 'flex' : 'none',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateTimePickerValue.endTime}
          mode="time"
          onChange={(e: any, date: any) =>
            onDatePickerChange(e, date, 'endTime')
          }
          display="spinner"
        />
      </View>
    </>
  );
}

const getTime = (date: Date) => {
  const dd = [date.getHours(), date.getMinutes()].map((a) =>
    a < 10 ? '0' + a : a
  );
  return dd.join(':');
};

const styles = StyleSheet.create({
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

export default DateTimePicker;
