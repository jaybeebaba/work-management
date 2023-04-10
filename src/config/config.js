import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCw2Wc6tpnG_-uPvpEq1KfFKPmwnjwoyXU",
    authDomain: "work-management-b0f4a.firebaseapp.com",
    projectId: "work-management-b0f4a",
    storageBucket: "work-management-b0f4a.appspot.com",
    messagingSenderId: "567411328227",
    appId: "1:567411328227:web:9ab9169838af7cd01f31d6"
  };

  firebase.initializeApp(firebaseConfig);

  const projectFireStore = firebase.firestore();

  const projectAuth = firebase.auth()

  const timeStamp = firebase.firestore.Timestamp

  export {projectFireStore, projectAuth, timeStamp}