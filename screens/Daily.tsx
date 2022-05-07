import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDayName, getLunarDate } from '../utils/amlich-hnd';


function Daily() {
  const [today, setToday] = useState(new Date());
  const [showToday, setShowToday] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [quotesList, setQuotesList] = useState([]);
  const [quote, setQuote] = useState<any>({});

  useEffect(() => {
    fetchData2();
  }, []);

  function getRandomQuote (arr: any) {
    return arr[Math.floor((Math.random()*arr.length))];
  }

  useEffect(() => {
    if(quotesList.length !== 0){
      setQuote(getRandomQuote(quotesList));
    }
  },[quotesList])

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const newDate = new Date();
    newDate.getDate() === today.getDate() &&
    newDate.getMonth() === today.getMonth() &&
    today.getFullYear() === newDate.getFullYear()
      ? setShowToday(false)
      : setShowToday(true);
  }, [today]);


  const fetchData2 = async () => {
    const url = 'https://type.fit/api/quotes';
    const data = await axios.get(url).then(res => res.data);
    data.map((item:any) => ({
     text: item.text,
     author: item.author
    }))
    setQuotesList(data);
  }

  const onSwipeUp = (state: any) => {
    setQuote(getRandomQuote(quotesList));
    setToday(new Date(today.setMonth(today.getMonth() + 1)));
  };

  const onSwipeDown = (state: any) => {
    setQuote(getRandomQuote(quotesList));
    setToday(new Date(today.setMonth(today.getMonth() - 1)));
  };
  const onSwipeLeft = (state: any) => {
    setToday(new Date(today.getTime() + 24 * 60 * 60 * 1000));
  };
  const onSwipeRight = (state: any) => {
    setToday(new Date(today.getTime() - 24 * 60 * 60 * 1000));
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onDatePickerChange = (e: any, date: any) => {
    setToday(date);
  };

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeRight={onSwipeRight}
      onSwipeLeft={onSwipeLeft}
      onSwipeDown={onSwipeDown}
      config={config}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <ImageBackground
            style={styles.background}
            source={require('../assets/images/bg13.png')}
          >
            <View style={styles.contentTop}>
              <Text style={styles.day}>{today.getDate()}</Text>
              <Text style={styles.weekdays}>THỨ HAI</Text>
            </View>
            <View style={styles.contentBottom}>
              {quotesList.length === 0 ? (
                <Text>Loading....</Text>
              ) : 
              (
                <View>
                  <Text style={styles.quote}>{quote.text}</Text>
                  <Text style={styles.author}>{quote.author ? quote.author : 'Anonymous'}</Text>
                </View>
              )
              
              }
            </View>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.col}>
              <MaterialCommunityIcons
                name="cloud"
                color={'#43919B'}
                size={28}
              />
              <Text style={styles.subTitle}>20°</Text>
              <Text>Hồ Chí Minh</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.title}>Giờ</Text>
              <Text style={styles.subTitle}>
                {`${clock.getHours()}:${clock.getMinutes()}`}
              </Text>
              <Text>Ất Mùi</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.title}>Ngày</Text>
              <Text style={styles.subDay}>
                {
                  getLunarDate(
                    today.getDate(),
                    today.getMonth() + 1,
                    today.getFullYear()
                  ).day
                }
              </Text>
              <Text>
                {
                  getDayName(
                    getLunarDate(
                      today.getDate(),
                      today.getMonth() + 1,
                      today.getFullYear()
                    )
                  ).ngay
                }
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.title}>Tháng</Text>
              <Text style={styles.subTitle}>
                {
                  getLunarDate(
                    today.getDate(),
                    today.getMonth() + 1,
                    today.getFullYear()
                  ).month
                }
              </Text>
              <Text>
                {
                  getDayName(
                    getLunarDate(
                      today.getDate(),
                      today.getMonth() + 1,
                      today.getFullYear()
                    )
                  ).thang
                }
              </Text>
              <Text>
                {
                  getDayName(
                    getLunarDate(
                      today.getDate(),
                      today.getMonth() + 1,
                      today.getFullYear()
                    )
                  ).nam
                }
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.pickDay}
          onPress={() => setShowDatePicker(!showDatePicker)}
        >
          <Text style={styles.pickDayText}>
            Tháng {today.getMonth() + 1} - {today.getFullYear()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.todayActive,
            display: `${showToday ? 'flex' : 'none'}`,
          }}
          onPress={() => setToday(new Date())}
        >
          <Text style={styles.todayActiveText}>Hôm nay</Text>
        </TouchableOpacity>
        <RNDateTimePicker
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            
            backgroundColor: '#fff',
            display: `${showDatePicker ? 'flex' : 'none'}`,
            
          }}
          textColor="#000"
          testID="dateTimePicker"
          value={today}
          mode="date"
          display="spinner"
          onChange={(e: any, date: any) => onDatePickerChange(e, date)}
        />
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickDay: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.2 }],
    backgroundColor: '#ccc',
    color: '#112B3C',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  pickDayText: {
    fontSize: 16,
  },
  todayActive: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#ccc',
    color: '#112B3C',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  todayActiveText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    opacity: 0.8,
    justifyContent: 'center',
  },
  contentTop: {
    alignItems: 'center',
  },
  day: {
    fontSize: 72,
    fontWeight: '600',
    color: '#001D6E',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subDay: {
    fontSize: 22,
    color: '#4700D8',
    fontWeight: '500',
  },
  weekdays: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '500',
  },
  contentBottom: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 100,
  },
  quote: {
    textAlign: 'center',
    color: '#112B3C',
    fontWeight: '500',
    fontSize: 16,
  },
  author: {
    alignSelf: 'flex-end',
    marginTop: 30,
    color: '#112B3C',
    fontWeight: '500',
    fontSize: 16,
  },
  header: {},
  footer: {
    // height: 140,
    backgroundColor: '#FAFDD6',
    paddingVertical: 12,
  },
  col: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  footerContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Daily;
