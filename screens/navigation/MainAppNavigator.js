import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import screens and stacks
import HomeStackNavigator from './HomeStackNavigator';
import ProfileScreen from '../LoggedInUserProfileScreen';
import SearchUsersStack from './SearchUsersStack';
import AcceptedMovesScreen from '../AcceptedMovesScreen';
import CreateMoveStack from './CreateMoveStack';

// Import the images from the assets folder
import homeIcon from '../../assets/home.png';
import searchIcon from '../../assets/search.png';
import createIcon from '../../assets/create.png';
import checkmarkIcon from '../../assets/checkmark.png';
import userIcon from '../../assets/user.png';

const Tab = createBottomTabNavigator();

const MainAppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* Home Stack */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'grey' : 'black' }}
            />
          ),
        }}
      />
      {/* Search Users Screen */}
      <Tab.Screen
        name="Search"
        component={SearchUsersStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={searchIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'grey' : 'black' }}
            />
          ),
        }}
      />
      {/* Create a MOVE Stack */}
      <Tab.Screen
        name="Create a MOVE"
        component={CreateMoveStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={createIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'grey' : 'black' }}
            />
          ),
        }}
      />
      {/* Accepted Moves Screen */}
      <Tab.Screen
        name="Accepted Moves"
        component={AcceptedMovesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={checkmarkIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'grey' : 'black' }}
            />
          ),
        }}
      />
      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={userIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'grey' : 'black' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;



