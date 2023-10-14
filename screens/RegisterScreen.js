import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../firebase";
import {  doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = async () => {
    if (!email || !password || !phone) {
      Alert.alert("Invalid Details", "Please Fill all the details");
      return;
    }

    try {
      // Create a user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

  

      // Store user data in Firestore
      const userDocRef = doc(db, "users", user.uid);// Adjust the collection name if needed

      console.log(userDocRef,"is userDoc")
      await setDoc(userDocRef, {
        email: user.email,
        phone,
      });

      // Successful registration
      Alert.alert("Success", "Registration was successful");
      navigation.navigate("Home"); // Navigate to another screen upon successful registration
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Registration Failed", "This email address is already in use.");
      } else {
        console.error("Error registering user:", error);
        Alert.alert("Registration Failed", "An error occurred while registering. Please try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
          Register
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
        />
        <Pressable
          onPress={register}
          style={styles.button}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </Pressable>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: "blue", margin: 20 }}>Already have an account? Sign In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 300,
    fontSize: 18,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#31BCE7",
    padding: 15,
    borderRadius: 7,
    width: 200,
    alignItems: "center",
  },
};

export default RegisterScreen;
