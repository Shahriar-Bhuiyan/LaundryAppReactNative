import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigator />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}
