// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCGTXh71z32VG1pUaq8pA6yho8CcWjXyS4',
  authDomain: 'technicalsewa-47c32.firebaseapp.com',
  projectId: 'technicalsewa-47c32',
  storageBucket: 'technicalsewa-47c32.firebasestorage.app',
  messagingSenderId: '453758398483',
  appId: '1:453758398483:web:a4752f6e286c958e3f4fe6',
  measurementId: 'G-MVT0C3DY56',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
