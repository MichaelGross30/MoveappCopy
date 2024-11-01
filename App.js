import 'react-native-gesture-handler'; // Required for React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import SignupEmailScreen from './screens/SignupEmailScreen';
import SignupPasswordScreen from './screens/SignupPasswordScreen';
import SignupNameScreen from './screens/SignupNameScreen';
import SignupUsernameScreen from './screens/SignupUsernameScreen';
import SignupPhoneScreen from './screens/SignupPhoneScreen';
import SignupDOBScreen from './screens/SignupDOBScreen';
import SignupBioScreen from './screens/SignupBioScreen';
import SignupProfilePictureScreen from './screens/SignupProfilePictureScreen';
import SignupUniversityScreen from './screens/SignupUniversityScreen';
import HomeScreen from './screens/HomeScreen';
import SearchUsersScreen from './screens/SearchUsersScreen';
import CreateMoveScreen from './screens/CreateMoveScreen';
import AcceptedMovesScreen from './screens/AcceptedMovesScreen';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen';
import LoggedInUserProfileScreen from './screens/LoggedInUserProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import NewChatScreen from './screens/NewChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Signup Stack for the onboarding flow
const SignupStack = () => (
  <Stack.Navigator initialRouteName="SignupEmail" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignupEmail" component={SignupEmailScreen} />
    <Stack.Screen name="SignupPassword" component={SignupPasswordScreen} />
    <Stack.Screen name="SignupName" component={SignupNameScreen} />
    <Stack.Screen name="SignupUsername" component={SignupUsernameScreen} />
    <Stack.Screen name="SignupPhone" component={SignupPhoneScreen} />
    <Stack.Screen name="SignupDOB" component={SignupDOBScreen} />
    <Stack.Screen name="SignupBio" component={SignupBioScreen} />
    <Stack.Screen name="SignupProfilePicture" component={SignupProfilePictureScreen} />
    <Stack.Screen name="SignupUniversity" component={SignupUniversityScreen} />
  </Stack.Navigator>
);

// Tab Navigator for the main app
const AppTabs = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="SearchUsers" component={SearchUsersScreen} />
    <Tab.Screen name="CreateMove" component={CreateMoveScreen} />
    <Tab.Screen name="AcceptedMoves" component={AcceptedMovesScreen} />
    <Tab.Screen name="UserProfile" component={LoggedInUserProfileScreen} />
    <Tab.Screen name="ChatList" component={ChatListScreen} />
  </Tab.Navigator>

);

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignupStack" component={SignupStack} />
        <Stack.Screen name="MainApp" component={AppTabs} />
        <Stack.Screen name="NewChat" component={NewChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;









