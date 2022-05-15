import RNDateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, toggleShowZodiac } from '../redux/actions/zodiacActions';

const zodiacList = [
  {
    id: 1,
    name: 'Ma kết',
    time: {
      from: '22/12',
      to: '19/1',
    },
    image: require('../assets/images/ma_ket.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Thuỷ Bình',
    time: {
      from: '20/1',
      to: '18/2',
    },
    image: require('../assets/images/bao_binh.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Song Ngư',
    time: {
      from: '19/2',
      to: '20/3',
    },
    image: require('../assets/images/song_ngu.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Bạch Dương',
    time: {
      from: '21/3',
      to: '19/4',
    },
    image: require('../assets/images/bach_duong.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Kim Ngưu',
    time: {
      from: '20/4',
      to: '20/5',
    },
    image: require('../assets/images/kim_nguu.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 6,
    name: 'Song Tử',
    time: {
      from: '21/5',
      to: '20/6',
    },
    image: require('../assets/images/song_tu.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 7,
    name: 'Cự Giải',
    time: {
      from: '21/6',
      to: '22/7',
    },
    image: require('../assets/images/cu_giai.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 8,
    name: 'Sư Tử',
    time: {
      from: '23/7',
      to: '12/8',
    },
    image: require('../assets/images/su_tu.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 9,
    name: 'Xử Nử',
    time: {
      from: '23/8',
      to: '22/9',
    },
    image: require('../assets/images/xu_nu.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 10,
    name: 'Thiên Bình',
    time: {
      from: '23/9',
      to: '22/10',
    },
    image: require('../assets/images/thien_binh.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 11,
    name: 'Thiên Yết',
    time: {
      from: '23/10',
      to: '21/11',
    },
    image: require('../assets/images/ho_cap.png'),
    description: [
      {
        id: 1,
        kind: 'love',

        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        kind: 'career',
        id: 2,
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        kind: 'emotion',
        id: 3,
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        kind: 'physic',
        id: 4,
        physical: '20%',
      },
      {
        kind: 'lucky',
        id: 5,
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
  {
    id: 12,
    name: 'Nhân Mã',
    time: {
      from: '22/11',
      to: '21/12',
    },
    image: require('../assets/images/nhan_ma.png'),
    description: [
      {
        id: 1,
        kind: 'love',
        title: 'Tình cảm',
        desc: 'Chuyện tình cảm tương đối đẹp. Ma Kết và nửa kia đang trải qua những giây phút ngọt ngào, ấm êm mà tình yêu đem tới. Người độc thâm sớm tìm được ý trung nhân nhờ sự mai mối của người thân.',
        star: 3,
      },
      {
        id: 2,
        kind: 'career',
        title: 'Sự nghiệp',
        desc: 'Công việc diễn ra thuân lợi. Sự thông minh và khả năng ứng biến linh hoạt giúp chòm sao này vượt qua các khó khăn một cách ngoạn mục. Tuy nhiên, tính các tự cao tự đại vô hình trung lại cản trở con đường tiến thân của chòm sao này.',
        star: 4,
      },
      {
        id: 3,
        kind: 'emotion',
        title: 'Cảm xúc',
        desc: 'Bạn tỏ ra tự cao, ngạo mạn và không xem ý kiến của ai ra gì.',
        star: 5,
      },
      {
        id: 4,
        kind: 'physic',
        physical: '20%',
      },
      {
        id: 5,
        kind: 'lucky',
        lucky: {
          color: 'Xanh dương',
          star: 'Thiên Yết',
          number: '7, 18',
          negotiate: '67',
        },
      },
    ],
  },
];

const Zodiac = (props: any) => {
  const [today, setToday] = useState(new Date());
  const [zodiac, setZodiac] = useState(zodiacList[0]);
  const dispatch = useDispatch();

  const isZodiacShow = useSelector((state: any) => state.zodiac.isZodiacShow);

  useEffect(() => {
    dispatch(setDate(today));
  }, [isZodiacShow]);

  useEffect(() => {
    const findEvent = zodiacList.find((item) => {
      const dateFrom = item.time.from + `/${today.getFullYear()}`;
      const dateTo = item.time.to + `/${today.getFullYear()}`;
      const d1 = dateFrom.split('/');
      const d2 = dateTo.split('/');

      const from = new Date(
        parseInt(d1[2]),
        parseInt(d1[1]) - 1,
        parseInt(d1[0])
      );
      const to = new Date(
        parseInt(d2[2]),
        parseInt(d2[1]) - 1,
        parseInt(d2[0])
      );

      return today >= from && today <= to;
    });
    if (findEvent) {
      setZodiac(findEvent);
    } else {
      setZodiac(zodiacList[0]);
    }
  }, [today]);

  useEffect(() => {
    dispatch(toggleShowZodiac(true));
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const onDatePickerChange = (e: Event, date: Date) => {
    setToday(date);
  };

  const renderIcons = (kind: string, star: any) => {
    if (!star) {
      return null;
    }
    switch (kind) {
      case 'love':
        return Array.from(new Array(5))
          .map((_, idx) => {
            if (idx < star) {
              return (
                <MaterialCommunityIcons
                  name="heart"
                  color="red"
                  size={18}
                  key={idx}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name="heart"
                  color="#ccc"
                  size={18}
                  key={idx}
                />
              );
            }
          })
          .reverse();
      case 'career':
        return Array.from(new Array(5))
          .map((_, idx) => {
            if (idx < star) {
              return (
                <MaterialCommunityIcons
                  name="star"
                  color="#2155CD"
                  size={18}
                  key={idx}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name="star"
                  color="#ccc"
                  size={18}
                  key={idx}
                />
              );
            }
          })
          .reverse();
      case 'emotion':
        return Array.from(new Array(5))
          .map((_, idx) => {
            if (idx < star) {
              return (
                <MaterialCommunityIcons
                  name="star-four-points"
                  color="#F9D923"
                  size={18}
                  key={idx}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name="star-four-points"
                  color="#ccc"
                  size={18}
                  key={idx}
                />
              );
            }
          })
          .reverse();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/images/paul-volkmer-qVotvbsuM_c-unsplash.jpg')}
      >
        <ScrollView>
          <View style={styles.zodiac}>
            <Image
              source={zodiac.image}
              style={styles.zodiacImage}
              resizeMode="contain"
            />
            <Text style={styles.zodiacTitle}>{zodiac.name}</Text>
            <Text
              style={styles.zodiacSubTitle}
            >{`${zodiac.time.from} - ${zodiac.time.to}`}</Text>
          </View>
          {!isZodiacShow && (
            <View style={styles.content}>
              <FlatList
                data={zodiac.description}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) => {
                  if (item.physical) {
                    return (
                      <View style={styles.widget}>
                        <View style={styles.header}>
                          <Text style={styles.title}>Thể chất</Text>
                          <Text style={styles.physic}>{item.physical}</Text>
                        </View>
                      </View>
                    );
                  }
                  if (item.lucky) {
                    return (
                      <View style={styles.widget}>
                        <View style={styles.header}>
                          <Text style={styles.title}>May mắn</Text>
                        </View>
                        <View style={styles.footer}>
                          <View style={styles.row}>
                            <Text style={styles.text}>Màu may mắn</Text>
                            <Text style={styles.text}>{item.lucky.color}</Text>
                          </View>
                          <View style={styles.row}>
                            <Text style={styles.text}>Sao hợp cạ</Text>
                            <Text style={styles.text}>{item.lucky.star}</Text>
                          </View>
                          <View style={styles.row}>
                            <Text style={styles.text}>Số may mắn</Text>
                            <Text style={styles.text}>{item.lucky.number}</Text>
                          </View>
                          <View style={styles.row}>
                            <Text style={styles.text}>Đàm phán thành công</Text>
                            <Text style={styles.text}>
                              {item.lucky.negotiate}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return (
                    <View style={styles.widget}>
                      <View style={styles.header}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.more}>
                          {/* <Text>{`${item.star}/5`}</Text> */}
                          {renderIcons(item.kind, item.star)}
                        </View>
                      </View>
                      <Text style={styles.desc}>{item.desc}</Text>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </ScrollView>
      </ImageBackground>
      {isZodiacShow && (
        <RNDateTimePicker
          style={{
            position: 'absolute',
            bottom: 170,
            left: 0,
            width: '100%',

            backgroundColor: 'transparent',
          }}
          textColor="#fff"
          testID="dateTimePicker"
          value={today}
          mode="date"
          display="spinner"
          onChange={(e: any, date: any) => onDatePickerChange(e, date)}
        />
      )}
    </View>
  );
};

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#ddd',
        marginVertical: 12,
      }}
    />
  );
};

export default Zodiac;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#666',
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  zodiac: {
    alignItems: 'center',
    marginTop: 110,
  },
  zodiacTitle: {
    color: '#cccccc',
    fontSize: 22,
  },
  zodiacImage: {
    width: 110,
  },
  zodiacSubTitle: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 8,
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 100,
  },
  widget: {},
  header: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  physic: {
    fontSize: 16,
    color: '#666',
  },
  title: { color: '#666', fontSize: 18 },
  more: {
    flexDirection: 'row',
  },
  desc: { color: '#333', marginTop: 20, fontSize: 14 },
  item: {
    width: 70,
    height: 70,
    marginTop: 100,
  },
  footer: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
