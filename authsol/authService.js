// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  } catch (error) {
    console.log(error)
  }
};

export const loadUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log(error)
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    // Handle errors
  }
};
