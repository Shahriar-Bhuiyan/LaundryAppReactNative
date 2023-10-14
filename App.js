import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
    <StackNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}

