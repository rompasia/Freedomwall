import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2LMBd0RgZbFXC-6k3D7YmXIynHUyNFL0",
  authDomain: "freedomwall-ee74b.firebaseapp.com",
  projectId: "freedomwall-ee74b",
  storageBucket: "freedomwall-ee74b.firebasestorage.app",
  messagingSenderId: "102387018580",
  appId: "1:102387018580:web:8b7448f3d24233cbdef6c1",
  measurementId: "G-WGGPXNGE5W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
