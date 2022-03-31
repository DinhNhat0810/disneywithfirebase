import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyD-eXhlp4chf1eU0ztIzdeVDVRHizXx0Rc",
    authDomain: "disneyclone-fb5fe.firebaseapp.com",
    projectId: "disneyclone-fb5fe",
    storageBucket: "disneyclone-fb5fe.appspot.com",
    messagingSenderId: "882007411688",
    appId: "1:882007411688:web:8d574017910a703c37f25d",
    measurementId: "G-80GKFX9VM9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider, storage }
export default db