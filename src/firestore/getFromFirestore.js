import { initializeApp } from 'firebase/app';

import {
    doc,
    getDoc,
    getDocs,
    getFirestore,
    collection,
    // query,
    // getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnMuBCUqPS5_3i8PO6ROKs_LzvOyJR_0E",
  authDomain: "foreverfaithanderic.firebaseapp.com",
  projectId: "foreverfaithanderic",
  storageBucket: "foreverfaithanderic.firebasestorage.app",
  messagingSenderId: "863688614045",
  appId: "1:863688614045:web:73dbb9ccf1d277349df474",
  measurementId: "G-LFNHQBG2H2"
};


const firebaseapp = initializeApp(firebaseConfig);

export const db = getFirestore();

export const getSingleDocument = async (collectionKey, documentKey) => {
    const docRef = doc(db, collectionKey, documentKey);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return {};
    } 
    const document = docSnap.data();
    return document;
}

export const getMultipleDocuments = async (collectionKey) => {
    const querySnapshot = await getDocs(collection(db, collectionKey));
    let documents = {}
    querySnapshot.docs.map((doc) => { 
        documents[doc.id] = doc.data()
    });
    return documents;
}

