import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { addEvent, changeEvent } from '../redux/actions/eventActions';
import { getSolarDateEvent } from '../utils/solarHoliday';
import { useSelector, useDispatch } from 'react-redux';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'thg 1',
    'thg 2',
    'thg 3',
    'thg 4 ',
    'thg 5',
    'thg 6',
    'thg 7',
    'thg 8',
    'thg 9',
    'thg 10',
    'thg 11.',
    'thg 12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

const INITIAL_DATE = formatDate(new Date());

const COLOR_LIST = [
  '#E45826',
  '#00FFDD',
  '#FFC300',
  '#06FF00',
  '#F999B7',
  '#292C6D',
  '#FFBC97',
];

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeEvent([
        {
          id: 1,
          color: 'red',
          title: formatDate2(new Date()),
          time: 'cả ngày',
        },
      ])
    );
  }, []);

  const onDayPress = useCallback((day) => {
    setSelectedDate(day.dateString);
    const dateSelected = getSolarDateEvent(`${day.day}-${day.month}`);

    dispatch(
      changeEvent([
        {
          id: 1,
          color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
          title: `${day.day}/${day.month}`,
          time: 'cả ngày',
        },
      ])
    );

    //Trả về ngày lễ dương lịch trong năm nếu có,
    if (dateSelected) {
      const newEvent = {
        id: randstr(),
        color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
        title: dateSelected,
        time: 'cả ngày',
      };
      dispatch(addEvent(newEvent));
    }
  }, []);

  const marked = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'red',
        selectedTextColor: '#fff',
      },
    };
  }, [selectedDate]);

  return (
    <Calendar
      theme={{ todayTextColor: 'red', textDayFontSize: 18 }}
      onDayPress={onDayPress}
      markedDates={marked}
    />
  );
}

function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: any) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function formatDate2(date: any) {
  return [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
    '/'
  );
}

function randstr() {
  return Math.random().toString(36).replace('0.', '');
}

export default CalendarComponent;
