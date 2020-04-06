import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB2JYjoXidom7-DznqSj-gWmvm7GH998a4",
  authDomain: "crwn-clothing-marmik.firebaseapp.com",
  databaseURL: "https://crwn-clothing-marmik.firebaseio.com",
  projectId: "crwn-clothing-marmik",
  storageBucket: "crwn-clothing-marmik.appspot.com",
  messagingSenderId: "12632044254",
  appId: "1:12632044254:web:2eef25e73434506eac084f",
  measurementId: "G-6ZCMTR0ZMH"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
