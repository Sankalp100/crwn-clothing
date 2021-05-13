import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBv6v1PDRcZhQSRE_DLMrotn-n0TWF6SmE",
    authDomain: "crwn-db-e07ee.firebaseapp.com",
    projectId: "crwn-db-e07ee",
    storageBucket: "crwn-db-e07ee.appspot.com",
    messagingSenderId: "329925642253",
    appId: "1:329925642253:web:cc508d2646cdec6587ed44",
    measurementId: "G-M65LJ1SJ08"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get()

      if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        } catch (error){
          console.log(error.message)
        }
      }

      return userRef;
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase 