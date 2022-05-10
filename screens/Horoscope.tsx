import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Tử vi
function Horoscope(props: any) {
  const {navigation} = props;

  const services = [
    {
      id: 1,
      image: require('../assets/images/nhamdan.jpg'),
      title: 'Tử vi 2022',
      url: 'tu-vi-2022'
    },
    {
      id: 2,
      image: require('../assets/images/yin-yang.png'),
      title: 'Tử vi hằng ngày',
      url: 'tu-vi-hang-ngay'
    },
    {
      id: 3,
      image: require('../assets/images/cau-doi-tet.jpg'),
      title: 'Tử Vi Trọn Đời',
      url: 'tu-vi-tron-doi'
    },
    {
      id: 4,
      image: require('../assets/images/moon-and-stars.png'),
      title: '12 Cung Hoàng Đạo',
      url: 'cung-hoang-dao'
    },
    {
      id: 5,
      image: require('../assets/images/star.png'),
      title: 'Xem sao',
      url: 'xem-sao'
    },
    {
      id: 6,
      image: require('../assets/images/love.png'),
      title: 'Bói Tình Duyên',
      url: 'boi-tinh-duyen'
    },
    {
      id: 7,
      image: require('../assets/images/open-hands.png'),
      title: 'Văn Khấn',
      url: 'van-khan'
    },
    {
      id: 8,
      image: require('../assets/images/heart.png'),
      title: 'Nhịp sinh học',
      url: 'nhip-sinh-hoc'
    },
    {
      id: 9,
      image: require('../assets/images/compass.png'),
      title: 'La bàn',
      url: 'la-ban'
    },
    {
      id: 10,
      image: require('../assets/images/ruler.png'),
      title: 'Thước lỗ ban',
      url: 'thuoc-lo-ban'
    },
    {
      id: 11,
      image: require('../assets/images/half-moon.png'),
      title: 'Giải mộng',
      url: 'giai-mong'
    },
    {
      id: 12,
      image: require('../assets/images/stopwatch.png'),
      title: 'Đổi ngày',
      url: 'doi-ngay'
    },
  ]

  const handleRedirect = (url: string) => {
    navigation.navigate('Zodiac');
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>

      {services.map(item => <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleRedirect(item.url)}>
        <Image source={item.image} style={styles.image}/>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  row:{
    flexDirection:"row",
    flexWrap: 'wrap',
    marginTop: 48
    
  },
  item:{
    width: '25%',
    alignItems: 'center',
    marginBottom: 24
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 14
  },
  title:{
    textAlign: 'center',
    marginTop: 12
  }
})

export default Horoscope;
