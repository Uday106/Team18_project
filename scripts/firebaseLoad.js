var firebaseConfig = {
    apiKey: "AIzaSyDDFhhK1gifOmdzDG7Nl5P2FsHeu_Okw-k",
    authDomain: "comp1800-team-project.firebaseapp.com",
    databaseURL: "https://comp1800-team-project.firebaseio.com",
    projectId: "comp1800-team-project",
    storageBucket: "comp1800-team-project.appspot.com",
    messagingSenderId: "1084725445646",
    appId: "1:1084725445646:web:7359002250906e6149285f",
    measurementId: "G-XVBBJYY191"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });