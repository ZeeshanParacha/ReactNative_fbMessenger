
import * as firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyBknNRy7jVsYgh_yKrftfVropry3Sn-C1I",
    authDomain: "reactnative-firebase-9bd1a.firebaseapp.com",
    databaseURL: "https://reactnative-firebase-9bd1a.firebaseio.com",
    projectId: "reactnative-firebase-9bd1a",
    storageBucket: "",
    messagingSenderId: "490377564801",
    appId: "1:490377564801:web:d07f0334288adc60"
};


const fbfirebase = firebase.initializeApp(firebaseConfig)
// Initialize Firebase
export default fbfirebase;