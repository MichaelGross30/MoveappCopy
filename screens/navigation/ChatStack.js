import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../ChatListScreen'; // Ensure correct path
import NewChatScreen from '../NewChatScreen'; // Ensure correct path
import ConversationScreen from '../ConversationScreen'; // Ensure correct path
import OtherUserProfileScreen from '../OtherUserProfileScreen'; // Ensure correct path

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChatListScreen">
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="NewChatScreen"
        component={NewChatScreen}
        options={{ title: 'New Chat' }}
      />
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={({ route }) => ({
          title: route.params?.username || 'Chat',
        })}
      />
      <Stack.Screen
        name="OtherUserProfileScreen"
        component={OtherUserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
