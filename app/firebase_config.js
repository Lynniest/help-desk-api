// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

const {initializeApp} = require('firebase/app');
const {getStorage, ref, uploadBytes} = require('firebase/storage');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "helpdeskstorage-fd6d9.firebaseapp.com",
  projectId: "helpdeskstorage-fd6d9",
  storageBucket: "helpdeskstorage-fd6d9.appspot.com",
  messagingSenderId: "236174638264",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-PGHPFCHD39"
};





// 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
// export const storageRef = ref(storage, 'some-child');
// module.exports = {storage};

module.exports = { firebaseConfig ,app ,storage};
