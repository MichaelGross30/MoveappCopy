// /screens/AcceptedMovesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AcceptedMovesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Accepted Moves Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AcceptedMovesScreen;
