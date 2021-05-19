import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCyU20WHgCFRh3YoZwMFzsHZWe5VZTB9nE",
    authDomain: "clone-89dfa.firebaseapp.com",
    databaseURL: "https://clone-89dfa.firebaseio.com",
    projectId: "clone-89dfa",
    storageBucket: "clone-89dfa.appspot.com",
    messagingSenderId: "464355909965",
    appId: "1:464355909965:web:fd30ab0230cb75e38c5704"
});

const auth = firebase.auth();
const db = firebase.firestore()

export { auth, db };