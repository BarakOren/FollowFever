import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBWI_DDBaS8D-yCh_WGE6ThGPCwySXSiWQ",
  authDomain: "followfever-ed5fe.firebaseapp.com",
  projectId: "followfever-ed5fe",
  storageBucket: "followfever-ed5fe.firebasestorage.app",
  messagingSenderId: "374507018138",
  appId: "1:374507018138:web:48cd5c90ed55cf8989cc23"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);    // <- add this
