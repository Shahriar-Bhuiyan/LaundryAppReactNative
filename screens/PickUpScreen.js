import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const currency = String.fromCharCode(0x09f3);

  useEffect(() => {
    // Calculate the end date as five days from the start date
    const newEndDate = new Date();
    newEndDate.setDate(startDate.getDate() + 5);

    setEndDate(newEndDate);
  }, [startDate]);

  console.log(selectedTime);
  console.log(selectedDelivery);
  console.log(cart);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days"
    },
    {
      id: "1",
      name: "3-4 Days"
    },
    {
      id: "2",
      name: "4-5 Days"
    },
    {
      id: "3",
      name: "5-6 Days"
    },
    {
      id: "4",
      name: "Tommorrow"
    }
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM"
    },
    {
      id: "1",
      time: "12:00 PM"
    },
    {
      id: "2",
      time: "1:00 PM"
    },
    {
      id: "3",
      time: "2:00 PM"
    },
    {
      id: "4",
      time: "3:00 PM"
    },
    {
      id: "5",
      time: "4:00 PM"
    }
  ];
  const navigation = useNavigation();

  const processToCart = () => {
    if (!selectedDate || !selectedTime || !selectedDelivery) {
      Alert.alert("Empty or invalid", "Please select all fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]);
    }
    if (selectedDate && selectedTime && selectedDelivery) {
      const serializedPickUpDate = selectedDate.toString();
      const serializedSelectedTime = JSON.stringify(selectedTime.time)
      navigation.replace("cart",{
        pickUpDate:serializedPickUpDate,
        selectedTime:serializedSelectedTime,
        no_Of_days:selectedDelivery,
    })
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 10,
            marginVertical: 20
          }}
        >
          Enter Address
        </Text>
        <TextInput
          multiline={true} // Enable multiline mode
          numberOfLines={4}
          style={{
            borderColor: "gray",
            borderWidth: 0.7,
            textAlignVertical: "top",
            padding: 10,
            textAlign: "left"
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick Up date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={startDate}
          endDate={endDate}
          initialSelectedDate={new Date("2020-08-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item) => (
            <Pressable
              onPress={() => setSelectedTime(item)}
              key={item.id}
              style={
                selectedTime && selectedTime.id === item.id
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                      backgroundColor: "#030303"
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7
                    }
              }
            >
              <Text
                style={
                  selectedTime &&
                  selectedTime.id === item.id && { color: "white" }
                }
              >
                {item.time}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedDelivery(item.name)}
            >
              <Text
                style={
                  selectedDelivery === item.name
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        color: "white",
                        borderWidth: 0.7,
                        backgroundColor: "#030303"
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: "gray",
                        borderWidth: 0.7
                      }
                }
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable
          style={{
            marginTop: "auto",
            backgroundColor: "#088FBF",
            padding: 10,
            margin: 15,
            marginBottom: 30,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
              {cart.length} Items | {total} {currency}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6
              }}
            >
              Extra Charges Might Apply
            </Text>
          </View>

          <Pressable onPress={processToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0 // Adjust for
  }
});
