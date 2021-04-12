import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database"
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBmceXJiUWmO9bn9rvyM6MWV7Htb9th7UU",
    authDomain: "connectin-5556b.firebaseapp.com",
    databaseURL: "https://connectin-5556b-default-rtdb.firebaseio.com",
    projectId: "connectin-5556b",
    storageBucket: "connectin-5556b.appspot.com",
    messagingSenderId: "402405188842",
    appId: "1:402405188842:web:590de3e9d7b158bdf52393",
    measurementId: "G-QY8Y0BVDK6"
  };

 firebase.initializeApp(firebaseConfig);




  const auth = firebase.auth();
  const database = firebase.database();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const firestoredb = firebase.firestore();

  export{ auth, database, timestamp, firestoredb };
