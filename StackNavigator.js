import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PickUpScreen from "./screens/PickUpScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ActivityIndicator } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [onAuthuser, setOnAuthUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = (user) => {
    setTimeout(() => {
      setLoading(false); // Set loading to false when the auth state has been checked
      if (user) {
        setOnAuthUser(JSON.stringify(user));
      } else {
        setOnAuthUser(null);
      }
    }, 800);
  };

  useEffect(() => {
    const sub = auth.onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  const content = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          flex: 1
        }}
      >
        <Text>Loading</Text>
        <ActivityIndicator size="large" color="red" />
      </View>

  )

  const Nav =  (
    <NavigationContainer>
      <Stack.Navigator>
       
            {onAuthuser && user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="pickup"
                  component={PickUpScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="cart"
                  component={CartScreen}
                  options={{ headerShown: false }}
                />
                 <Stack.Screen
                  name='Order'
                  component={OrderScreen}
                  options={{headerShown:false}}
                />

                <Stack.Screen
                  name='profile'
                  component={ProfileScreen}
                  options={{headerShown:false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
              </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );


  return loading ? content :Nav;
};

export default StackNavigator;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0 // Adjust for
  }
});
