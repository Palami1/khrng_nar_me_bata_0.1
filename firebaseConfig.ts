import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ເພີ່ມ Auth
import { getStorage } from "firebase/storage"; // ເພີ່ມ Storage (ຖ້າຈຳເປັນ)

const firebaseConfig = {
    apiKey: "AIzaSyBlGvAlblWas3oA2mJZiDwUxcV8L9KNuRI",
    authDomain: "ltc-workflow.firebaseapp.com",
    projectId: "ltc-workflow",
    storageBucket: "ltc-workflow.firebasestorage.app",
    messagingSenderId: "837786875425",
    appId: "1:837786875425:web:fbea0ba24cd7afde039560"
};

// Initialize App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };