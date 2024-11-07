import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; 
import app from '../firebase'; 
import moment from 'moment';

const SignupDOBScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber } = route.params;
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Function to handle date selection
  const handleConfirm = (date) => {
    const formattedDate = moment(date).format('MM/DD/YYYY');
    const age = moment().diff(date, 'years');

    if (age < 12) {
      setErrorMessage('You must be at least 12 years old to use the app.');
      setDateOfBirth('');
    } else {
      setErrorMessage('');
      setDateOfBirth(formattedDate);
    }
    setDatePickerVisibility(false);
  };

  const handleNext = async () => {
    if (!dateOfBirth) {
      setErrorMessage('Date of birth is required.');
    } else {
      setErrorMessage('');

      const user = auth.currentUser;
      if (user) {
        try {
          // Save the date of birth in Firestore
          await updateDoc(doc(db, 'users', user.uid), { dateOfBirth });

          // Navigate to the next screen
          navigation.navigate('SignupBio', { email, password, name, username, phoneNumber, dateOfBirth });
        } catch (error) {
          console.error('Error saving date of birth to Firestore:', error);
          setErrorMessage('Failed to save your date of birth. Please try again.');
        }
      } else {
        setErrorMessage('No authenticated user found.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Date of Birth</Text>
      <Button title="Select Date of Birth" onPress={() => setDatePickerVisibility(true)} />
      {dateOfBirth ? <Text style={styles.date}>{dateOfBirth}</Text> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Next" onPress={handleNext} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()} // Set maximum date to today
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  date: { fontSize: 18, marginVertical: 8 },
  error: { color: 'red' },
});

export default SignupDOBScreen;

