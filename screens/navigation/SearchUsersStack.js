import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUsersScreen from '../SearchUsersScreen';
import OtherUserProfileScreen from '../OtherUserProfileScreen';

const Stack = createNativeStackNavigator();

const SearchUsersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchUsers"
      screenOptions={{
        headerShown: false, // Hide the header if you want a cleaner look
      }}
    >
      <Stack.Screen 
        name="SearchUsers" 
        component={SearchUsersScreen} 
      />
      <Stack.Screen 
        name="OtherUserProfileScreen" 
        component={OtherUserProfileScreen} 
      />
    </Stack.Navigator>
  );
};

export default SearchUsersStack;
