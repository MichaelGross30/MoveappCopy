// SignupStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import each screen in the signup process, in the specified order
import SignupEmailScreen from '../Signup/SignupEmailScreen';  // Corrected this line
import SignupPasswordScreen from '../Signup/SignupPasswordScreen';
import SignupNameScreen from '../Signup/SignupNameScreen';
import SignupUsernameScreen from '../Signup/SignupUsernameScreen';
import SignupPhoneScreen from '../Signup/SignupPhoneScreen';
import SignupDOBScreen from '../Signup/SignupDOBScreen';
import SignupBioScreen from '../Signup/SignupBioScreen';
import SignupProfilePictureScreen from '../Signup/SignupProfilePictureScreen';
import SignupUniversityScreen from '../Signup/SignupUniversityScreen';


// Create the Stack Navigator
const Stack = createStackNavigator();

const SignupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignupEmailScreen"
      screenOptions={{
        headerShown: false, // Hide headers for a cleaner look
      }}
    >
      {/* Define each screen in the signup flow in the correct order */}
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
};

export default SignupStack;
