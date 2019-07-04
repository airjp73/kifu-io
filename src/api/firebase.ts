import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const devConfig = {
  apiKey: 'AIzaSyAFRHkIeSpcffE8sH3EoX-4oEkZP5c7U1o',
  authDomain: 'go-reviews.firebaseapp.com',
  databaseURL: 'https://go-reviews.firebaseio.com',
  projectId: 'go-reviews',
  storageBucket: 'go-reviews.appspot.com',
  messagingSenderId: '548448055248',
};

const prodConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// Check that we haven't already initialized
// so hot-reloading doesn't cause an error
const firebaseApp = firebase.apps.length
  ? firebase.apps[0]
  : firebase.initializeApp(config);

export default firebaseApp;
