import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function More() {

  const services = [
    {
      id: 1,
      image: require('../assets/images/schedule.png'),
      title: 'Ngày này năm xưa'
    },
    {
      id: 2,
      image: require('../assets/images/yin-yang.png'),
      title: 'Dang ngôn'
    },
    {
      id: 3,
      image: require('../assets/images/cau-doi-tet.jpg'),
      title: 'Video Hay'
    },
    {
      id: 4,
      image: require('../assets/images/moon-and-stars.png'),
      title: '12 Cung Hoàng Đạo'
    },
    {
      id: 5,
      image: require('../assets/images/star.png'),
      title: 'Lễ hội'
    },
    {
      id: 6,
      image: require('../assets/images/love.png'),
      title: 'Phong tục'
    },
    {
      id: 7,
      image: require('../assets/images/open-hands.png'),
      title: 'Hát ru'
    },
    {
      id: 8,
      image: require('../assets/images/heart.png'),
      title: 'Đồng Dao'
    },
    {
      id: 9,
      image: require('../assets/images/compass.png'),
      title: 'Gửi Thiệp'
    },
    {
      id: 10,
      image: require('../assets/images/ruler.png'),
      title: 'Đếm xui ngược'
    },
    {
      id: 11,
      image: require('../assets/images/half-moon.png'),
      title: 'Truyện Tiếu Lâm'
    },
    {
      id: 12,
      image: require('../assets/images/stopwatch.png'),
      title: 'Trò Chơi'
    },
    {
      id: 13,
      image: require('../assets/images/stopwatch.png'),
      title: 'Có thể bạn chưa biết?'
    },
    {
      id: 14,
      image: require('../assets/images/stopwatch.png'),
      title: 'Góc thư giãn'
    },
    {
      id: 15,
      image: require('../assets/images/stopwatch.png'),
      title: 'Phóng sự ảnh'
    },
    {
      id: 16,
      image: require('../assets/images/stopwatch.png'),
      title: 'Bài viết truyền cảm hứng'
    },
  ]

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Thư viện nội dung</Text>
      </View>
      <View style={styles.row}>
      {services.map(item => <TouchableOpacity key={item.id} style={styles.item}>
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
  header:{
    marginTop: 24,
    fontSize: 22,
    fontWeight: '500',

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

export default More;
