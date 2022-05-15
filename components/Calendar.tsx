import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDailyEvent,
  changeSelectedDate,
  updateDailyEvent,
} from '../redux/actions/eventActions';
import { formatDate2, formatTime, INITIAL_DATE, randstr } from '../utils';
import { getLunarDate } from '../utils/amlich-hnd';
import { getSolarDateEvent } from '../utils/solarHoliday';

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
  const selectedDate = useSelector((state: any) => state.event.selectedDate);
  const dispatch = useDispatch();
  const eventList = useSelector((state: any) => state.event.eventList);

  useEffect(() => {
    dispatch(
      updateDailyEvent([
        {
          id: 1,
          color: 'red',
          title: formatDate2(new Date()),
          time: 'cả ngày',
        },
      ])
    );
  }, []);

  useEffect(() => {
    console.log(selectedDate);
    const dateSelected = getSolarDateEvent(
      `${selectedDate.day}-${selectedDate.month}`
    );
    const lunarDate = getLunarDate(
      selectedDate.day,
      selectedDate.month,
      selectedDate.year
    );
    //Show ngày click
    const dailyEvent = [
      {
        id: randstr(),
        color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
        title: `${lunarDate.day}/${lunarDate.month}`,
        time: 'cả ngày',
      },
    ];
    dispatch(updateDailyEvent(dailyEvent));

    //Trả về ngày lễ dương lịch trong năm nếu có,
    if (dateSelected) {
      const newEvent = {
        id: randstr(),
        color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
        title: dateSelected,
        time: 'cả ngày',
      };
      dispatch(addDailyEvent([newEvent]));
    }

    //Get events from state.event.eventList
    const newDailyEvent = eventList
      .filter((e: any) => {
        const today = new Date(selectedDate.timestamp);
        const startDate = e.time.startDate.getTime();
        const endDate = e.time.endDate.getTime();
        return today >= startDate && today <= endDate;
      })
      .map((e: any) => {
        const startTime = e.time.startTime;
        const endTime = e.time.endTime;
        return {
          id: e.id,
          color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
          title: e.title,
          // time: `${formatTime(startTime)}-${formatTime(endTime)}`,
          time: `${
            startTime && endTime
              ? `${formatTime(startTime)}-${formatTime(endTime)}`
              : 'Cả ngày'
          }`,
        };
      });
    dispatch(addDailyEvent(newDailyEvent));
  }, [selectedDate, eventList]);

  const onDayPress = (day: any) => {
    dispatch(changeSelectedDate(day));
  };

  const marked = useMemo(() => {
    return {
      [selectedDate.dateString]: {
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

export default CalendarComponent;
