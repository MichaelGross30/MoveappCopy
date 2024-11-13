import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function TopBar({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
             <Text style={{ color: 'orange', fontWeight: 'bold' }}>Move</Text>
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => {
                // handle bell icon press
              }}>
              <View style={styles.headerNotifications}>
                <FeatherIcon color="#222" name="bell" size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // Navigate to the ChatStack (ChatListScreen)
                navigation.navigate('ChatStack');
              }}>
              <View style={styles.headerNotifications}>
                <FeatherIcon color="#222" name="message-square" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#222',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  headerNotifications: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


