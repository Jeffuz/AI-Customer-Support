// src/firebase/auth.ts

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

import { collection, addDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string) => {
    try {
      // Use Firebase Authentication to create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optionally, store additional user data in Firestore
    //   await addDoc(collection(db, 'users'), {
    //     uid: user.uid,
    //     email,
    //     // You can add more user data here if needed
    //   });

      // Return user information if needed
      return user;
    } catch (error) {
      console.error('Error signing up: ', error);
      throw error;
    }
  };


export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
