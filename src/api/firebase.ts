import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// const devConfig = {
//   apiKey: 'AIzaSyAFRHkIeSpcffE8sH3EoX-4oEkZP5c7U1o',
//   authDomain: 'go-reviews.firebaseapp.com',
//   databaseURL: 'https://go-reviews.firebaseio.com',
//   projectId: 'go-reviews',
//   storageBucket: 'go-reviews.appspot.com',
//   messagingSenderId: '548448055248',
// };

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

console.log(process.env);
console.log(config);

// Check that we haven't already initialized
// so hot-reloading doesn't cause an error
const firebaseApp = firebase.apps.length
  ? firebase.apps[0]
  : firebase.initializeApp(config);

export default firebaseApp;
