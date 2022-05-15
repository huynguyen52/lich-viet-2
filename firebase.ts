import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYlYA7bhzrGOPWBly-XGAsJVtQsEPey-U',
  authDomain: 'lich-viet-2.firebaseapp.com',
  projectId: 'lich-viet-2',
  storageBucket: 'lich-viet-2.appspot.com',
  messagingSenderId: '1004487973542',
  appId: '1:1004487973542:web:d3da51836ae64300b27267',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
