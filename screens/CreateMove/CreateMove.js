//THIS FILE MIGHT GET DELETED NGL DOESNT HAVE USE RN
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import CreateMoveStep1 from './CreateMoveStep1';

const CreateMove = () => {
  // State to store the MOVE details
  const [moveDetails, setMoveDetails] = useState({
    MOVEPicture: '',
    name: '',
    description: '',
  });

  // Function to update move details
  const updateMoveDetails = (key, value) => {
    setMoveDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  // Function to handle moving to the next step
  const goToNextStep = () => {
    console.log('Move details:', moveDetails);
    // Navigate to the next step here or do something with the moveDetails
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <CreateMoveStep1
        nextStep={goToNextStep}
        updateMoveDetails={updateMoveDetails}
        moveDetails={moveDetails}
      />
    </View>
  );
};

export default CreateMove;
