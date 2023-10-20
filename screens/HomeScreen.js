import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Carousel from "../Components/Carousel";
import Services from "../Components/Services";
import Dressitem from "../Components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const [item,setItem] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const product = useSelector((state) => state.product.product);
  const currency = String.fromCharCode(0x09f3);
  const dispatch = useDispatch()
  const navigation = useNavigation()

  console.log("myself cart", cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
    
  }, []);

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db,'types');
      const docsSnap = await getDocs(colRef);
      let updatedItem = []
      docsSnap.forEach((doc)=>{
        updatedItem.push(doc.data())
      });
      console.log('my loaded product',updatedItem)
      updatedItem.map((select)=>dispatch(getProducts(select)))
    };
    fetchProducts();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please Enable The Location Services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    console.log("myselfcords", coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      console.log(response);

      for (let item of response) {
        let address = `${item.street} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  

  
  console.log('These are my products',JSON.stringify(product))

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Entypo name="location-pin" size={30} color="#c0392b" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable onPress={()=>navigation.navigate('profile')} style={{ marginLeft: "auto", marginRight: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{
                uri: "https://media.licdn.com/dms/image/C4D03AQFSh6-pguUP_g/profile-displayphoto-shrink_800_800/0/1618675516593?e=1701907200&v=beta&t=yUqtlrKJjTbhu0W_L_YBBuBwRxb-GaU_NTCJxtAjQQQ"
              }}
            />
          </Pressable>
        </View>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            margin: 10,
            alignItems: "center",
            justifyContent: "space-between",
            borderBlockColor: "#95a5a6",
            borderWidth: 0.5,
            borderRadius: 10
          }}
        >
          <TextInput placeholder="Search For item or More"></TextInput>
          <FontAwesome5 name="search" size={24} color="black" />
        </View>
        {/* image Carousel */}
        <Carousel />
        {/* Services */}
        <Services />
        {/* Render all the product */}
        {product?.map((item, index) => (
          <Dressitem item={item} key={index} />
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
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

          <Pressable onPress={()=>navigation.navigate('pickup')}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
