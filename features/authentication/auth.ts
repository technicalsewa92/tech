// auth.js
import { auth, facebookProvider, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Contains user information
  } catch (error) {
    console.error('Google Login Error:', error);
    throw error;
  }
};

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user; // Contains user information
  } catch (error) {
    console.error('Facebook Login Error:', error);
    throw error;
  }
};
