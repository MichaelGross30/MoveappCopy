// Step3DateAndTime.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Step3DateAndTime = ({ nextStep, prevStep, updateMoveDetails, moveDetails }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleNext = () => {
    updateMoveDetails('startDateTime', startDate.toISOString());
    if (endDate) updateMoveDetails('endDateTime', endDate.toISOString());
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Date and Time</Text>

      <Button title="Select Start Date & Time" onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Button title="Select End Date & Time (Optional)" onPress={() => setShowEndPicker(true)} />
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="datetime"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            setEndDate(date);
          }}
        />
      )}

      <Button title="Previous" onPress={prevStep} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default Step3DateAndTime;
