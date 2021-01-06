import firebase from 'firebase'

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
var fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default fire;