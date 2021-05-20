import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCK82hQ-Ha0CuqpzWsrAuszJxYzytm9xcM",
  authDomain: "pomodoro-4a4f6.firebaseapp.com",
  databaseURL: "https://pomodoro-4a4f6-default-rtdb.firebaseio.com",
  projectId: "pomodoro-4a4f6",
  storageBucket: "pomodoro-4a4f6.appspot.com",
  messagingSenderId: "918325180657",
  appId: "1:918325180657:web:dcc33211cafd2af4709150",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
