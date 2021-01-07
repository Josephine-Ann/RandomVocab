import firebase from 'firebase'
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyDIGRAs08LfARKMvaojN_r5IdwsKaQEHN8",
    authDomain: "randomvocab-722e0.firebaseapp.com",
    databaseURL: "https://randomvocab-722e0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "randomvocab-722e0",
    storageBucket: "randomvocab-722e0.appspot.com",
    messagingSenderId: "317865599298",
    appId: "1:317865599298:web:e5655359600b697d3ce8db",
    measurementId: "G-VK89912P0Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('signed in')
    } else {
        console.log('signed out')
    }
});

// firebase.analytics();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { googleAuthProvider, firebase, database as default };
// export { firebase, database as default };
