import { firebaseApp } from "../Firebase";
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword, signOut , GoogleAuthProvider , signInWithRedirect , signInWithPopup , onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();
const firebaseAuth = getAuth(firebaseApp);

export const createUser = (email , password) => {
    return createUserWithEmailAndPassword(firebaseAuth , email , password);
}

export const logIn = (email , password) => {
    return signInWithEmailAndPassword(firebaseAuth , email , password);
}

export const logOut = () => {
    return signOut(firebaseAuth);
}


export const redirectGoogle = () => {
    return signInWithRedirect(firebaseAuth, provider);
}

export const popupGoogle = () => {
    return signInWithPopup(firebaseAuth, provider);
}

export const getUser = (callback)=> {
    return onAuthStateChanged(firebaseAuth , callback)
}