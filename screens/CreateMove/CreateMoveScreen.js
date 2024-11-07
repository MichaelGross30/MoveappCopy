// CreateMoveScreen.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Step1Details from './Step1Details';
import Step2Invites from './Step2Invites';
import Step3DateAndTime from './Step3DateAndTime';
import Step4AdditionalSettings from './Step4AdditionalSettings';
import Step5UniversityPosting from './Step5UniversityPosting';

const CreateMoveScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [moveDetails, setMoveDetails] = useState({
    profilePicture: '',
    name: '',
    description: '',
    invitedUsers: [],
    startDateTime: '',
    endDateTime: '',
    lockedGallery: false,
    location: '',
    maxUsers: null,
    postToUniversity: false,
  });

  // Function to update move details as we go through steps
  const updateMoveDetails = (field, value) => {
    setMoveDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Display the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Details nextStep={nextStep} updateMoveDetails={updateMoveDetails} moveDetails={moveDetails} />;
      case 2:
        return <Step2Invites nextStep={nextStep} prevStep={prevStep} updateMoveDetails={updateMoveDetails} moveDetails={moveDetails} />;
      case 3:
        return <Step3DateAndTime nextStep={nextStep} prevStep={prevStep} updateMoveDetails={updateMoveDetails} moveDetails={moveDetails} />;
      case 4:
        return <Step4AdditionalSettings nextStep={nextStep} prevStep={prevStep} updateMoveDetails={updateMoveDetails} moveDetails={moveDetails} />;
      case 5:
        return <Step5UniversityPosting prevStep={prevStep} moveDetails={moveDetails} navigation={navigation} />;
      default:
        return <Text>Invalid Step</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CreateMoveScreen;
