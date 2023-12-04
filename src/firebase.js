// // firebase.js
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/analytics';

// const firebaseConfig = {
//     apiKey: "AIzaSyC2MkBxVngagcvjEC9LTaEhnZ1Ex5HQ_tA",
//     authDomain: "gauri--clone.firebaseapp.com",
//     projectId: "gauri--clone",
//     storageBucket: "gauri--clone.appspot.com",
//     messagingSenderId: "266321958314",
//     appId: "1:266321958314:web:7ccf71901916246f0f07d3",
//     measurementId: "G-YB702QV1CW"
// };

// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const analytics = firebase.analytics();

// export { app, auth, analytics };
// firebase.js

// firebase.js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2MkBxVngagcvjEC9LTaEhnZ1Ex5HQ_tA",
    authDomain: "gauri--clone.firebaseapp.com",
    projectId: "gauri--clone",
    storageBucket: "gauri--clone.appspot.com",
    messagingSenderId: "266321958314",
    appId: "1:266321958314:web:7ccf71901916246f0f07d3",
    measurementId: "G-YB702QV1CW"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
export default firebaseApp;
