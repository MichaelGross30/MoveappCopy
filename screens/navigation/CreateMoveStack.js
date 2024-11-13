import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Create a MOVE screens
import CreateMoveStep1 from '../CreateMove/CreateMoveStep1'; // Correct path
import Step2Invites from '../CreateMove/Step2Invites';
import Step3DateAndTime from '../CreateMove/Step3DateAndTime';
import Step4AdditionalSettings from '../CreateMove/Step4AdditionalSettings';
import Step5Confirmation from '../CreateMove/Step5Confirmation';



const Stack = createStackNavigator();

const CreateMoveStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateMoveStep1">
      <Stack.Screen 
        name="CreateMoveStep1" 
        component={CreateMoveStep1} 
        options={{ title: 'Step 1: Name & Description' }} 
      />
      <Stack.Screen 
        name="Step2Invites" 
        component={Step2Invites} 
        options={{ title: 'Step 2: Invited Users' }} 
      />
      <Stack.Screen 
        name="Step3DateAndTime" 
        component={Step3DateAndTime} 
        options={{ title: 'Step 3: Date & Time' }} 
      />
      <Stack.Screen 
        name="Step4AdditionalSettings" 
        component={Step4AdditionalSettings} 
        options={{ title: 'Step 4: Additional Settings' }} 
      />
      <Stack.Screen 
        name="Step5Confirmation" 
        component={Step5Confirmation} 
        options={{ title: 'Step 5: Confirm Your MOVE' }} 
      />
    </Stack.Navigator>
  );
};

export default CreateMoveStack;
