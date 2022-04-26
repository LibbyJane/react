import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyClyYKACrk_1dkutrT26XvZQ2zjr2D8OwE",
    authDomain: "cookit-6dab1.firebaseapp.com",
    projectId: "cookit-6dab1",
    storageBucket: "cookit-6dab1.appspot.com",
    messagingSenderId: "940772178214",
    appId: "1:940772178214:web:069d300dc20cbf712529e7"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }