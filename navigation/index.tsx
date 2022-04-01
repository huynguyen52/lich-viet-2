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
import { Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <TouchableOpacity>
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
