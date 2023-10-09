import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://img.freepik.com/premium-photo/interior-real-laundry-room-with-washing-machine-home_566707-2617.jpg",
    "https://img.freepik.com/premium-photo/laundry-basket-blurred-background-modern-washing-machine_488220-17518.jpg",
    "https://img.freepik.com/premium-vector/laundry-service-building-washing-shop_8071-8203.jpg"
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        imageComponentStyle={{
          borderRadius: 10,
          width: "93%"
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
