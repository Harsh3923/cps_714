import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const key = import.meta.env.VITE_FIREBASE_API_KEY;

const USE_FIRESTORE = !!key && key !== "0";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    };

let db=null;
let app=null;
if (USE_FIRESTORE) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

export { app, db, USE_FIRESTORE };