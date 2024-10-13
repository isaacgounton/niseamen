import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC3zU2TFyASwkVHKlNFf57CJhp_9wnwRVU",
    authDomain: "niseamen.firebaseapp.com",
    databaseURL: "https://niseamen.firebaseio.com",
    projectId: "niseamen",
    storageBucket: "niseamen.appspot.com",
    messagingSenderId: "578866985713",
    appId: "1:578866985713:web:05df1380459293b50bc750"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app