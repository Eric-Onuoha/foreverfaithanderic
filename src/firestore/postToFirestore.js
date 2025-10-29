import { initializeApp } from "firebase/app";
import objectHash from "object-hash";
import { v4 } from "uuid";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnMuBCUqPS5_3i8PO6ROKs_LzvOyJR_0E",
  authDomain: "foreverfaithanderic.firebaseapp.com",
  projectId: "foreverfaithanderic",
  storageBucket: "foreverfaithanderic.firebasestorage.app",
  messagingSenderId: "863688614045",
  appId: "1:863688614045:web:73dbb9ccf1d277349df474",
  measurementId: "G-LFNHQBG2H2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);
// const analytics = getAnalytics(app);
export const db = getFirestore();

// ✅ Add / Update documents
export const addCollectionAndDocuments = (
  CollectionKey,
  docKey,
  docToAdd,
  mergeStatus = true
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, CollectionKey, docKey), docToAdd, { merge: mergeStatus });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

// ✅ Upload files with metadata
export const uploadDocWithImages = (
  filesToUpload,
  CollectionKey,
  docKey,
  docToAdd,
  mergeStatus = true
) => {
  if (docKey === undefined) {
    docKey = objectHash.MD5(docToAdd);
  }

  let imageList = [];
  filesToUpload.forEach((fileToUpload) => {
    const reference = ref(Storage, `Application/CV/${docKey + v4()}`);
    uploadBytes(reference, fileToUpload)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadURL) => {
        console.log("Download URL", downloadURL);
        imageList.push(downloadURL);

        if (filesToUpload.length === imageList.length) {
          docToAdd["images"] = imageList;
          docToAdd["id"] = docKey;
          addCollectionAndDocuments(CollectionKey, docKey, docToAdd, mergeStatus);
        }
      });
  });
};

// ✅ Reduce quantity in Firestore after payment
export const reduceRegistryItemQuantity = async (collectionKey, docId, quantityToReduce = 1) => {
  try {
    const docRef = doc(db, collectionKey, docId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.error("Item not found:", docId);
      return;
    }

    const currentData = snapshot.data();
    const currentQuantity = Number(currentData.quantity) || 0;
    const newQuantity = Math.max(0, currentQuantity - quantityToReduce);

    await updateDoc(docRef, { quantity: newQuantity });

    console.log(`✅ Updated ${docId} quantity to ${newQuantity}`);
    return newQuantity;
  } catch (error) {
    console.error("Error reducing item quantity:", error);
  }
};