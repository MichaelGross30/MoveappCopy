import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, DatePickerIOS, Platform, DatePickerAndroid } from 'react-native';

// Import the useMoveDetails hook to access the context
import { useMoveDetails } from './MoveDetailsContext';

const Step3DateAndTime = ({ nextStep, prevStep }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // Access moveDetails and updateMoveDetails from context
  const { moveDetails, updateMoveDetails } = useMoveDetails();

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    updateMoveDetails('startDateTime', newDate.toISOString());
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    updateMoveDetails('endDateTime', newDate ? newDate.toISOString() : null);
  };

  const showEndDatePicker = () => {
    if (Platform.OS === 'android') {
      DatePickerAndroid.open({
        date: endDate || new Date(),
        mode: 'spinner',
      }).then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day);
          handleEndDateChange(selectedDate);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Set Date and Time</Text>
      
      {/* Start Date Picker */}
      <Text style={styles.label}>Start Date and Time:</Text>
      <DatePickerIOS date={startDate} onDateChange={handleStartDateChange} mode="datetime" />
      
      {/* End Date Picker (Optional) */}
      <Text style={styles.label}>End Date and Time (Optional):</Text>
      {Platform.OS === 'ios' ? (
        <DatePickerIOS date={endDate || new Date()} onDateChange={handleEndDateChange} mode="datetime" />
      ) : (
        <Button title="Select End Date" onPress={showEndDatePicker} />
      )}

      <Button title="Back" onPress={prevStep} />
      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  label: { fontSize: 18, marginVertical: 8 },
});

export default Step3DateAndTime;

