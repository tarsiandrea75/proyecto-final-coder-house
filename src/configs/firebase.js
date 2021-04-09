import firebase from "firebase/app";
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyD3VWQ45QN2U7_kMSdpSp-zxQUQ9yvkfug",
    authDomain: "camada14520-andrea-tarsi.firebaseapp.com",
    projectId: "camada14520-andrea-tarsi",
    storageBucket: "camada14520-andrea-tarsi.appspot.com",
    messagingSenderId: "361275826888",
    appId: "1:361275826888:web:c268f93b93b7636391fbfd"
});

export function getFirestore() {
    return firebase.firestore();
}