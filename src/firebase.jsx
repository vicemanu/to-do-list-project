import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyAlamZB2zWsyl0j9o2tMk5V4JVnnYt0TBo",
  authDomain: "to-do-list-project-628bf.firebaseapp.com",
  projectId: "to-do-list-project-628bf",
  storageBucket: "to-do-list-project-628bf.appspot.com",
  messagingSenderId: "628903645203",
  appId: "1:628903645203:web:a1ac2e42cdc86bc5116fe6",
  measurementId: "G-MRWXBZJLG9"
};

const fireBaseApp = initializeApp(firebaseConfig);

const data = getFirestore(fireBaseApp);
const auth = getAuth(fireBaseApp);

export { data, auth };