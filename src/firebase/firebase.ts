import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAFRHkIeSpcffE8sH3EoX-4oEkZP5c7U1o',
  authDomain: 'go-reviews.firebaseapp.com',
  databaseURL: 'https://go-reviews.firebaseio.com',
  projectId: 'go-reviews',
  storageBucket: 'go-reviews.appspot.com',
  messagingSenderId: '548448055248',
};

// Check that we haven't already initialized
// so hot-reloading doesn't cause an error
const firebaseApp = firebase.apps.length
  ? firebase.apps[0]
  : firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp;
