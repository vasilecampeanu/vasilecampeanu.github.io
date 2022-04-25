import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB60g8sNsWXkDzBWyy3P00nPmnchhrjNWA",
    authDomain: "blog-firebase-13ec2.firebaseapp.com",
    projectId: "blog-firebase-13ec2",
    storageBucket: "blog-firebase-13ec2.appspot.com",
    messagingSenderId: "329740725194",
    appId: "1:329740725194:web:3fdc9e1ea5478e06ecbd33",
    measurementId: "G-0V8P8VVYS1"
};

// Init firebase app
initializeApp(firebaseConfig);

// Init services
const db = getFirestore();

// Collections ref
const colRef = collection(db, "tests");

// Get collection data
getDocs(colRef).then((snapshot) => {
    let tests = [];
    snapshot.docs.forEach((doc) => {
        tests.push({ ...doc.data(), id: doc.id })
    });
    console.log(tests);
}).catch(err => {
    console.log(err.message);
});