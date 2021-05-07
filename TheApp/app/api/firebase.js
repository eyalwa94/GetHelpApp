import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAK7lsv_alk2yw9_u1dLoQa0SxLjZAOdnQ",
  authDomain: "get-help-app-proj.firebaseapp.com",
  projectId: "get-help-app-proj",
  storageBucket: "get-help-app-proj.appspot.com",
  messagingSenderId: "812616690940",
  appId: "1:812616690940:web:e246a27b811b5cab3bfb79",
  measurementId: "G-B5E6V96818",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore;
const auth = firebase.auth;
export default firebase;
export { firestore,auth };
