// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDDFhhK1gifOmdzDG7Nl5P2FsHeu_Okw-k",
    authDomain: "comp1800-team-project.firebaseapp.com",
    databaseURL: "https://comp1800-team-project.firebaseio.com",
    projectId: "comp1800-team-project",
    storageBucket: "comp1800-team-project.appspot.com",
    messagingSenderId: "1084725445646",
    appId: "1:1084725445646:web:67fc41cd65a0355049285f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();