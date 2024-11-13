import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Fake data for friends looking for MOVES
const friendsLookingForMoves = [
  { id: '1', name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '3', name: 'Emily Johnson', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '4', name: 'Michael Brown', profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '5', name: 'Chris Williams', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '6', name: 'Sarah Davis', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '7', name: 'David Miller', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '8', name: 'Jessica Moore', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

export default function FriendsLookingForMoves() {
  return (
    

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Friends Looking for a MOVE</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.listAction}>
              <Text style={styles.listActionText}>View All</Text>

              <FeatherIcon
                color="#706F7B"
                name="chevron-right"
                size={16} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {friendsLookingForMoves.map(({ id, name, profilePicture }) => (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  <Image source={{ uri: profilePicture }} style={styles.cardImg} />
                  <Text style={styles.cardLabel}>{name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** List */
  list: {
    
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listActionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
  },
  listContent: {
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  /** Card */
  card: {
    width: 80,
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  cardImg: {
    width: 70,
    height: 70,
    marginBottom: 5,
    borderRadius: 35,
  },
  cardLabel: {
    fontWeight: '600',
    fontSize: 8,
    lineHeight: 18,
    color: 'green',
  },
});
