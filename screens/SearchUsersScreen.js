// /screens/SearchUsersScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchUsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Search Users Screen</Text>
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

export default SearchUsersScreen;
