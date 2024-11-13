import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './firebase'; // Ensure Firebase is correctly imported
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore

// Import navigation stacks
import SignupStack from './screens/navigation/SignupStack';
import MainAppNavigator from './screens/navigation/MainAppNavigator';

// Import the MoveDetailsProvider
import { MoveDetailsProvider } from './screens/CreateMove/MoveDetailsContext'; // Add this line

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false); // Track if the user is new

  // Check authentication status and user profile data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Check if the user's profile is complete in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Check if the user has completed the signup (has a name and username)
            if (userData.name && userData.username) {
              setIsLoggedIn(true);
              setIsNewUser(false);
            } else {
              setIsLoggedIn(true);
              setIsNewUser(true);
            }
          } else {
            // If no document found, treat as new user
            setIsLoggedIn(true);
            setIsNewUser(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsNewUser(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Show a loading indicator while checking authentication status
  if (isLoading) return null;

  return (
    // Wrap the entire app in MoveDetailsProvider to give access to the context
    <MoveDetailsProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          isNewUser ? (
            <SignupStack /> // Show Signup Stack for new users
          ) : (
            <MainAppNavigator /> // Show Main App for existing users
          )
        ) : (
          <SignupStack /> // Show Signup Stack for logged-out users
        )}
      </NavigationContainer>
    </MoveDetailsProvider>
  );
}




