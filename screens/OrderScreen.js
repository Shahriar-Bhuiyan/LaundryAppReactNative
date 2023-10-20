import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { useEffect } from "react";

const OrderScreen = () => {
  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <SafeAreaView>
      <LottieView
        ref={animation}
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center"
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center"
        }}
      >
        Your Order has Been Placed
      </Text>
      <LottieView
      ref={animation}
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignItems: "center"
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
