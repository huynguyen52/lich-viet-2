import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

const ENTRIES1 = [
  {
    title: 'Bạch Dương',
    subtitle: '21/3 - 19/4',
    illustration: require('../assets/images/bach_duong.png'),
  },
  {
    title: 'Kim Ngưu',
    subtitle: '20/4 - 20/5',
    illustration: require('../assets/images/kim_nguu.png'),
  },
  {
    title: 'Song tử',
    subtitle: '21/5 - 21/6',
    illustration: require('../assets/images/song_tu.png'),
  },
  {
    title: 'Cự giải ',
    subtitle: '22/6 - 22/7',
    illustration: require('../assets/images/cu_giai.png'),
  },
  {
    title: 'Sư tử',
    subtitle: '23/7 - 22/8',
    illustration: require('../assets/images/su_tu.png'),
  },
  {
    title: 'Xử nữ',
    subtitle: '23/8 - 22/9',
    illustration: require('../assets/images/xu_nu.png'),
  },
  {
    title: 'Thiên Bình',
    subtitle: '23/9 - 23/10',
    illustration: require('../assets/images/thien_binh.png'),
  },
  {
    title: 'Hổ Cáp',
    subtitle: '24/10 - 21/11',
    illustration: require('../assets/images/ho_cap.png'),
  },
  {
    title: 'Nhân Mã',
    subtitle: '22/11 - 21/12',
    illustration: require('../assets/images/nhan_ma.png'),
  },
  {
    title: 'Ma kết',
    subtitle: '22/12 - 19/1',
    illustration: require('../assets/images/ma_ket.png'),
  },
  {
    title: 'Bảo Bình',
    subtitle: '20/1 - 18/2',
    illustration: require('../assets/images/bao_binh.png'),
  },
  {
    title: 'Song Ngư',
    subtitle: '19/2 - 20/3',
    illustration: require('../assets/images/song_ngu.png'),
  },
];
const { width: screenWidth } = Dimensions.get('window');

const Zodiac = (props: any) => {
  const [entries, setEntries] = useState<any>([]);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.illustration}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default Zodiac;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 70,
    height: 70,
    marginTop: 100,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
