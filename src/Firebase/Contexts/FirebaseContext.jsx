import { createContext, useContext, useEffect, useState } from "react";
import * as Store from "../utils/Store";
import * as Auth from '../utils/Auth'


const FirebaseContext = createContext(null)

export const useAuth = () => useContext(FirebaseContext).Auth;
export const useStore = () => useContext(FirebaseContext).Store;
export const getcurrentUser = () => useContext(FirebaseContext).currentUser;

export const FirebaseContextProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState(null);
    const obj = { Auth, currentUser, Store }

    useEffect(() => {
        Auth.getUser((user) => {
            setcurrentUser(user);
            console.log(user)
        })
    }, []);

    return (
        <FirebaseContext.Provider value={obj}>
            {children}
        </FirebaseContext.Provider>
    )
}