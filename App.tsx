import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
