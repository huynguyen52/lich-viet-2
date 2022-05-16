import 'expo-dev-client';

import { registerRootComponent } from 'expo';

import App from './App';

import PushNotification from 'react-native-push-notification';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },

  requestPermissions: Platform.OS === 'ios'
})
