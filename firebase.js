// Import necessary Firebase and AsyncStorage modules
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDArS9QIxuB8NTf6Y37BtkMbody37no_R4',
  authDomain: 'move-3faf3.firebaseapp.com',
  projectId: 'move-3faf3',
  storageBucket: 'gs://move-3faf3.appspot.com',
  messagingSenderId: '56496153436',
  appId: '1:56496153436:ios:8bf42d5584310fc6b65799',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized services
export { auth, db };
export default app;
