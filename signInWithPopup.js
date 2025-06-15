import { signInWithPopup, GoogleAuthProvider, getAuth } from'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth();


const PARENT_FRAME = document.location.ancestorOrigins[0];


const PROVIDER = new GoogleAuthProvider();

function sendResponse(result) {
  globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener('message', function({data}) {
  if (data.initAuth) {
    signInWithPopup(auth, PROVIDER)
      .then(sendResponse)
      .catch(sendResponse)
  }
});
