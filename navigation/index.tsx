import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import DailyScreen from '../screens/Daily';
import EventsScreen from '../screens/Events';
import HoroscopeScreen from '../screens/Horoscope';
import MoreScreen from '../screens/More';
import NotFoundScreen from '../screens/NotFound';
import ModalScreen from '../screens/Modal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addEventForm, updateEvent } from '../redux/actions/eventActions';
import { randstr } from '../utils';
import EventDetail from '../screens/EventDetail';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';
import Zodiac from '../screens/Zodiac';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<any>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const dispatch = useDispatch();
  const formValue = useSelector((state: any) => state.event.formValue);
  const selectedDate = useSelector((state: any) => state.event.selectedDate);
  const eventList = useSelector((state: any) => state.event.eventList);

  const handleAddEventForm = (goBack: any) => {
    formValue && dispatch(addEventForm({ id: randstr(), ...formValue }));
    goBack();
  };

  const handleUpdateEventForm = async (navigation: any) => {
    formValue && dispatch(updateEvent(formValue));
    navigation.navigate('Home');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="Zodiac"
        component={Zodiac}
        options={() => {
          return {
            title: 'Chọn ngày sinh nhật',
            headerTitleStyle: {
              color: '#fff'
            },
            headerRight: () => (
              <TouchableOpacity
                
              >
                <MaterialCommunityIcons
                  name="check"
                  color={'#ccc'}
                  size={28}
                />
              </TouchableOpacity>
            ),
            headerTransparent: true
          }
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={({ navigation, route }) => {
          const { goBack } = navigation;
          return {
            title: 'Chi tiết sự kiện',
            headerLeft: () => (
              <TouchableOpacity
                style={{ ...styles.headerLeft, marginLeft: -18 }}
                onPress={goBack}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  color={'red'}
                  size={28}
                />
                <Text style={styles.headerText}>
                  {'Tháng ' + selectedDate.month}
                </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditEvent', {
                    event: route.params?.event,
                  })
                }
              >
                <Text style={styles.headerText}>Sửa</Text>
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={({ navigation }) => {
            const { state, goBack } = navigation;

            return {
              title: 'Sự kiện mới',
              headerLeft: () => (
                <TouchableOpacity onPress={() => goBack()}>
                  <Text
                    style={{ color: 'red', fontSize: 18, fontWeight: '400' }}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => handleAddEventForm(goBack)}>
                  <Text
                    style={{ color: 'red', fontSize: 18, fontWeight: '400' }}
                  >
                    Thêm
                  </Text>
                </TouchableOpacity>
              ),
            };
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="EditEvent"
          component={ModalScreen}
          options={({ navigation, route }) => {
            const { state, goBack } = navigation;
            return {
              title: 'Sửa sự kiện',
              headerLeft: () => (
                <TouchableOpacity onPress={() => goBack()}>
                  <Text
                    style={{ color: 'red', fontSize: 18, fontWeight: '400' }}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => handleUpdateEventForm(navigation)}
                >
                  <Text
                    style={{ color: 'red', fontSize: 18, fontWeight: '400' }}
                  >
                    Xong
                  </Text>
                </TouchableOpacity>
              ),
            };
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            );
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Modal')}
              style={{ marginRight: 18, padding: 8 }}
            >
              <MaterialCommunityIcons name="plus" color={'red'} size={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          title: 'Lịch ngày',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-multiselect"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Sự kiện',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        options={{
          title: 'Tử vi',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="yin-yang" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreScreen}
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: 'red',
  },
});
