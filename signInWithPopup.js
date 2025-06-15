
const firebaseConfig = {
  apiKey: "AIzaSyB_Q4URffEbtM_Amrr4uVhqIDZeJeHTgNs",
  authDomain: "my-page-summarizer.firebaseapp.com",
  projectId: "my-page-summarizer",
  storageBucket: "my-page-summarizer.firebasestorage.app",
  messagingSenderId: "163674124159",
  appId: "1:163674124159:web:a7df11133cf80ef4f0744a",
  measurementId: "G-548ZGYP3H0"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const PARENT_FRAME = document.location.ancestorOrigins[0];
const PROVIDER = new firebase.auth.GoogleAuthProvider();

function sendResponse(result) {
  globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener('message', function({ data }) {
  if (data.initAuth) {
    auth.signInWithPopup(PROVIDER)
      .then(sendResponse)
      .catch(sendResponse);
  }
});
