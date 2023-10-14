import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const  [password,setPassword] = useState('');
    const navigation = useNavigation();
    console.log(email);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.navigate("Home");
        }
      });
  
      return unsubscribe;
    }, []);
  
    const login = async () => {
      try {
        if (!email || !password) {
          Alert.alert("Invalid Details", "Please enter both email and password.");
          return;
        }
  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
      } catch (error) {
        console.error("Error logging in:", error);
        Alert.alert("Login Failed", "An error occurred while logging in. Please try again.");
      }
    };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Sign in
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign in to your account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={'black'}
              value={email}
              onChangeText={(text)=>setEmail(text)}
              style={{
                fontSize:email?18:12,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 20,
                marginLeft: 13
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ios-key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={(text)=>setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize:password ? 18 : 12,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 13
              }}
            />
          </View>

          <Pressable onPress={login} style={{width:200,backgroundColor:"#31BCE7",padding:15,borderRadius:7,marginTop:50,marginLeft:'auto',marginRight:'auto'}}>
            <Text style={{fontSize:18,textAlign:'center',color:'white',fontWeight:'bold'}}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop:20}} >
            <Text style={{textAlign:'center',fontSize:18,color:'gray',fontWeight:'500'}}>Don't Have a account?Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 35 : 0, // Adjust for
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10
  }
});
