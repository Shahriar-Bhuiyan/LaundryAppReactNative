import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import {auth} from '../firebase'
import { signOut } from 'firebase/auth'

const ProfileScreen = () => {

    const user = auth.currentUser;

    const signOutUser = ()=>{
        signOut(auth).then(()=>{
            console.log('user is log out')
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <SafeAreaView  style={styles.safeArea}>
        <Pressable>
            <Text>Welcome {user.email}</Text>
        </Pressable>
        <Pressable onPress={signOutUser}>
            <Text>Sign out</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    paddingHorizontal: 30, // Adjust for,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});