import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox } from 'react-native';
import { data } from '../data';
import { getLunarDate, daysInMonth } from '../utils/amlich-hnd';

const listEvents = [];

interface MonthEventType {
  days: {
    day: number;
    events: {
      title: string;
      isLunar: boolean;
    }[];
    lunarDay: {
      day: number;
      jd: number;
      leap: number;
      month: number;
      year: number;
    };
  }[];
  id: number;
  month: number;
}

function Events() {
  const { solarHoliday, lunarHoliday, month } = data;

  const [monthEvents, setmonthEvents] = useState([] as MonthEventType[]);

  useEffect(() => {
    const test = solarHoliday.map((item, idx) => {
      const days = daysInMonth(item.month, 2022);
      let day: number;
      const events = [];

      for (day = 1; day <= days; day++) {
        const sth = item.events
          .filter((e) => e.date === day)
          .map((e) => {
            return {
              title: e.title,
              isLunar: false,
            };
          });
        const lunarDay = getLunarDate(day, item.month, 2022);
        const sth2: any = lunarHoliday
          .find((e) => e.month === lunarDay.month)
          ?.events.filter((e) => e.date === lunarDay.day)
          .map((e) => {
            return {
              title: e.title,
              isLunar: true,
            };
          });
        if (sth.length > 0 || (sth2 && sth2.length > 0)) {
          events.push({
            day: day,
            lunarDay: lunarDay,
            events: sth.concat(sth2),
          });
        }
      }
      return {
        id: idx,
        month: item.month,
        days: events,
      };
    });
    setmonthEvents(test);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (monthEvents[0] !== undefined) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {month.map((item, idx) => (
            <View key={item.id} style={styles.widget}>
              <View style={styles.month}>
                <ImageBackground style={styles.background} source={item.image}>
                  <Text style={styles.monthText}>{item.monthStr} - 2022</Text>
                </ImageBackground>
              </View>
              <View style={styles.content}>
                <FlatList
                  data={monthEvents.find((e) => e.month === item.month)?.days}
                  keyExtractor={(item) => item.day.toString()}
                  ItemSeparatorComponent={FlatListItemSeparator}
                  renderItem={({ item }) => (
                    <View style={styles.row}>
                      <View style={styles.title}>
                        <Text style={styles.titleMain}>{item.day}</Text>
                        <Text style={styles.titleSub}>{item.lunarDay.day}</Text>
                      </View>
                      <FlatList
                        data={item.events}
                        style={styles.listEvents}
                        renderItem={({ item }) => (
                          <TouchableOpacity style={styles.event}>
                            <View style={styles.eventMain}>
                              <Text style={styles.eventTitle}>
                                {item.title}
                              </Text>
                              <Text style={styles.eventSubTitle}>Cả ngày</Text>
                            </View>
                            <View style={styles.eventIcon}>
                              <MaterialCommunityIcons
                                name="flower-poppy"
                                color={'#EB5353'}
                                size={18}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, idx) => idx.toString()}
                        ItemSeparatorComponent={FlatListItemSeparator}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <Text>Loading....</Text>
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
        marginVertical: 4,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  widget: {},
  month: {
    height: 80,
  },
  monthText: {
    color: '#000',
    fontSize: 16,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    width: 70,
    paddingVertical: 4,
  },
  titleMain: {
    fontWeight: '500',
    fontSize: 28,
    color: '#000',
  },
  titleSub: {
    color: '#FF1818',
  },
  listEvents: {
    flex: 1,
  },
  event: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 8,
  },
  eventMain: {},
  eventTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  eventSubTitle: {
    color: '#5F7464',
  },
  eventIcon: {},
});

export default Events;
