import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addToCart,
  decrementQuantityCart,
  incrementQuantity,
  cleanCart
} from "../CartReducer";
import { decrementQuantityProduct, incrementQty ,clearProduct} from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { db ,auth} from "../firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const currency = String.fromCharCode(0x09f3);
  const navigation = useNavigation();
  const disPatch = useDispatch();
  const route = useRoute();
  const pickUpDate = new Date(route.params.pickUpDate);
  const formattedPickUpDate = pickUpDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const userUid = auth.currentUser.uid

  const placeOrder = async () => {
    navigation.navigate("Order");
    disPatch(cleanCart());
    disPatch(clearProduct())
    await setDoc(doc(db,'users',`${userUid}`),{
      orders:{...cart},
      pickUpDetails:route.params,
    },{
      merge:true
    })
  };
  return (
    <>
    <ScrollView style={styles.safeArea}>
      {total === 0 ? (
        <>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <Text>Your Bucket</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your Cart is Empty</Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <Text>Your Bucket</Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginRight: 10,
              padding: 14
            }}
          >
            {cart.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 0.5,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  shadowColor: "gray",
                  shadowOffset: { width: 10, height: 2 },
                  shadowOpacity: 0.6,
                  shadowRadius: 4,
                  backgroundColor: "white",
                  borderRadius: 2
                }}
              >
                <Text style={{ width: 100, fontSize: 15, fontWeight: "500" }}>
                  {item.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5
                  }}
                >
                  <Pressable
                    onPress={() => {
                      disPatch(decrementQuantityCart(item)); // cart
                      disPatch(decrementQuantityProduct(item));
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center"
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: "600"
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      disPatch(incrementQuantity(item)); // cart
                      disPatch(incrementQty(item)); //product
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center"
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
                <Text>
                  {item.price * item.quantity} {currency}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {total}{currency}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {formattedPickUpDate}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.selectedTime.replace(/"/g, '')}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {Math.round(total * 1.15)} {currency}
                  </Text>
                </View>
              </View>
            </View>

        </>
      )}
    </ScrollView>

{total === 0 ? null : (
  <Pressable
    style={{
      backgroundColor: "#088F8F",
      marginTop: "auto",
      padding: 10,
      marginBottom: 40,
      margin: 15,
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
        {cart.length} items | $ {total}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "400",
          color: "white",
          marginVertical: 6,
        }}
      >
        extra charges might apply
      </Text>
    </View>

    <Pressable onPress={placeOrder}>
      <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
        Place Order
      </Text>
    </Pressable>
  </Pressable>
)}
</>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    paddingHorizontal: 30 // Adjust for
  }
});
