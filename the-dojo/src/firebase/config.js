import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDGyTe9DyvtL9ySTTq8XAsuojtQ2imey2A",
    authDomain: "thedojo-d76cf.firebaseapp.com",
    projectId: "thedojo-d76cf",
    storageBucket: "thedojo-d76cf.appspot.com",
    messagingSenderId: "475667142609",
    appId: "1:475667142609:web:fe8ab1d0c5fc6bc080b2f0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()
const projectAuth = getAuth(app)
const projectStorage = getStorage(app)

export { db, projectAuth, projectStorage }

