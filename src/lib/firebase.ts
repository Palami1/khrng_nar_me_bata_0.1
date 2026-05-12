import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBlGvAlblWas3oA2mJZiDwUxcV8L9KNuRI",
    authDomain: "ltc-workflow.firebaseapp.com",
    projectId: "ltc-workflow",
    storageBucket: "ltc-workflow.firebasestorage.app",
    messagingSenderId: "837786875425",
    appId: "1:837786875425:web:fbea0ba24cd7afde039560"
};

// ກວດສອບຄວາມຖືກຕ້ອງຂອງ Config ກ່ອນ initialize
const isConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

if (!isConfigValid) {
    if (typeof window !== 'undefined') {
        console.error("❌ Firebase Config ບໍ່ຄົບຖ້ວນ! ກະລຸນາກວດສອບ Environment Variables (NEXT_PUBLIC_...).");
    }
}

// ປ້ອງກັນການ crash ຖ້າ config ບໍ່ຖືກຕ້ອງ
let app: any;
let db: any = null;
let auth: any = null;
let storage: any = null;

try {
    if (isConfigValid) {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
    } else {
        console.error("❌ Firebase Config is invalid, services will not be available.");
    }
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error);
}

export { db, auth, storage };
