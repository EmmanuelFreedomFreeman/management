// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVV59y6Loy43-qeDR3wD8p8Zn_HIPGT6s",
  authDomain: "management-8a4f4.firebaseapp.com",
  projectId: "management-8a4f4",
  storageBucket: "management-8a4f4.appspot.com",
  messagingSenderId: "448175852469",
  appId: "1:448175852469:web:b06d1bb695ea3d355be7fc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore(app);

export {auth,db}

export default firebaseConfig;