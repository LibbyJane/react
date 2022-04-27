import firebase from 'firebase/app'
import 'firebase/firestore'
// first add authentication at https://console.firebase.google.com/, then
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB0SVUJOiL4vUlgp5Pok6I7BgqoFaF8Ejk",
    authDomain: "mymoney-31a93.firebaseapp.com",
    projectId: "mymoney-31a93",
    storageBucket: "mymoney-31a93.appspot.com",
    messagingSenderId: "993586957491",
    appId: "1:993586957491:web:1fb6b21d50c44e093cb4c6"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }