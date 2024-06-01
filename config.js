const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } = require('firebase/firestore');

const config = {
  apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
  authDomain: "rv-robin.firebaseapp.com",
  databaseURL:
    "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rv-robin",
  storageBucket: "rv-robin.appspot.com",
  messagingSenderId: "911030592361",
  appId: "1:911030592361:web:fc66e57966ae12792713f8",
  measurementId: "G-J3PK5ED135",
};

const app = initializeApp(config);
const firestore = getFirestore(app);

module.exports = { firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where };