import 'react-native-gesture-handler'; // Required for React Navigation
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons (you may need to install this package)

// Firebase imports
import './firebase'; // Import your Firebase configuration file
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import Firebase auth instance

// Import Screens i have a bonder
import SignupEmailScreen from './screens/SignupEmailScreen';
import SignupPasswordScreen from './screens/SignupPasswordScreen';
import SignupNameScreen from './screens/SignupNameScreen';
import SignupUsernameScreen from './screens/SignupUsernameScreen';
import SignupPhoneScreen from './screens/SignupPhoneScreen';
import SignupDOBScreen from './screens/SignupDOBScreen';
import SignupBioScreen from './screens/SignupBioScreen';
import SignupProfilePictureScreen from './screens/SignupProfilePictureScreen';
import SignupUniversityScreen from './screens/SignupUniversityScreen'; // Ensure this is the correct path
import HomeScreen from './screens/HomeScreen';
import SearchUsersScreen from './screens/SearchUsersScreen';
import CreateMoveScreen from './screens/CreateMoveScreen';
import AcceptedMovesScreen from './screens/AcceptedMovesScreen';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen'; // Ensure this is imported
import LoggedInUserProfileScreen from './screens/LoggedInUserProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import NewChatScreen from './screens/NewChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for the main app
const AppTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'SearchUsers':
            iconName = 'search-outline';
            break;
          case 'CreateMove':
            iconName = 'walk-outline'; // You can change this to another relevant icon
            break;
          case 'AcceptedMoves':
            iconName = 'checkmark-done-outline';
            break;
          case 'UserProfile':
            iconName = 'person-outline';
            break;
          default:
            iconName = 'ellipse-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="SearchUsers" component={SearchUsersScreen} />
    <Tab.Screen name="CreateMove" component={CreateMoveScreen} />
    <Tab.Screen name="AcceptedMoves" component={AcceptedMovesScreen} />
    <Tab.Screen name="UserProfile" component={LoggedInUserProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track if the user has completed signup

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const completeSignup = () => {
    setIsSignedUp(true); // Set signup completion to true
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedUp && user ? (
          <Stack.Screen name="MainApp" component={AppTabs} />
        ) : (
          // Use React.Fragment to wrap multiple screens without introducing an extra element
          <>
            <Stack.Screen name="SignupEmail">
              {props => <SignupEmailScreen {...props} completeSignup={completeSignup} />}
            </Stack.Screen>
            <Stack.Screen name="SignupPassword" component={SignupPasswordScreen} />
            <Stack.Screen name="SignupName" component={SignupNameScreen} />
            <Stack.Screen name="SignupUsername" component={SignupUsernameScreen} />
            <Stack.Screen name="SignupPhone" component={SignupPhoneScreen} />
            <Stack.Screen name="SignupDOB" component={SignupDOBScreen} />
            <Stack.Screen name="SignupBio" component={SignupBioScreen} />
            <Stack.Screen name="SignupProfilePicture" component={SignupProfilePictureScreen} />
            <Stack.Screen name="SignupUniversity" component={SignupUniversityScreen} />
          </>
        )}
        <Stack.Screen name="NewChat" component={NewChatScreen} />
        <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


















