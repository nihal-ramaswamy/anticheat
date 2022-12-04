import * as firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAMc2eDvFD_01pPlFupHG2bYl9dVRYkA9E",
  authDomain: "tauri-eabb8.firebaseapp.com",
  projectId: "tauri-eabb8",
  storageBucket: "tauri-eabb8.appspot.com",
  messagingSenderId: "540602481010",
  appId: "1:540602481010:web:06ff455475c3b49f63c5eb"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export const firestore = firebase.firestore()
export const storage = firebase.storage()
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider };