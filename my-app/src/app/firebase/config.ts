// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASHb5eiryL1OeNSnWC225ZJe4aeewP63o",
  authDomain: "ai-customer-support-8a830.firebaseapp.com",
  projectId: "ai-customer-support-8a830",
  storageBucket: "ai-customer-support-8a830.appspot.com",
  messagingSenderId: "191140576881",
  appId: "1:191140576881:web:736832b7541733225e25d0",
  measurementId: "G-HM283JW1KH"
};

// Initialize Firebase only on the client
let app: ReturnType<typeof initializeApp> | null = null;
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
}

export const auth = app ? getAuth(app) : null;
