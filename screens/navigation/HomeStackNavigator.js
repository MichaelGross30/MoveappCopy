// navigation/HomeStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import ChatStack from './ChatStack';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Home Screen */}
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* Chat Stack */}
      <HomeStack.Screen name="ChatStack" component={ChatStack} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
