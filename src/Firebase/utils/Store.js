import { firebaseApp } from "../Firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, where, query, deleteDoc, arrayUnion, arrayRemove, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

function getFileExtension(filename) {
    const name = filename?.substring(0, filename.lastIndexOf('.'));
    const extension = filename?.substring(filename.lastIndexOf('.') + 1, filename.length);
    return [name, extension];
}

const deleteFile = async (uid, did) => {
    const Ref = ref(storage, `${uid + "+" + did.toString()}`);
    return await deleteObject(Ref);
}

export const uploadFile = async (uid, fid, file, metadata) => {
    const date = new Date();
    const time = date.getTime()
    const storageRef = ref(storage, `${uid + "+" + time}`);
    try {
        await uploadBytesResumable(storageRef, file)
    } catch (error) {
        console.log(error)
    }
    // await getMetadata(storageRef)
    // .then((metadata) => {
    // })
    const url = await getDownloadURL(storageRef)
    await setDoc(doc(db, "users", uid, "folders", fid.toString(), 'data', time.toString()), {
        ...metadata,
        displayName: getFileExtension(metadata.name)[0],
        ext: getFileExtension(metadata.name)[1],
        downloadUrl: url,
        idx: time.toString(),
        uploadedOn: date,
        isFavorite: false,
    });
}

export const checkHomeDir = async (uid) => {
    const date = new Date();
    const q = query(collection(db, "users", uid, "folders"), where("idx", "==", 'home'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        await setDoc(doc(db, "users", uid, "folders", 'home'), {
            idx: "home",
            createdOn: date,
            includes: [],
            ext: "folder",
        })
    }
}

export const createFolder = async (uid, metadata, folderId) => {
    const date = new Date();
    const time = date.getTime()
    const newRef = doc(db, "users", uid, 'folders', time.toString())
    await setDoc(doc(db, "users", uid, 'folders', time.toString()), {
        idx: time.toString(),
        name: metadata.name,
        createdOn: date,
        ext: 'folder',
    });
    await updateDoc(doc(db, "users", uid, "folders", folderId.toString()),
        {
            includes: arrayUnion(newRef)
        });
}

// export const getCurrentFolder = async (uid, fid) => {
//     const q = query(collection(db, "users", uid, "folders"), where("idx", "==", fid.toString()));
//     let data = []
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         data.push(doc.data())
//     });
//     return [data[0]?.path, data[0]?.pathName];
// }

export const getUserData = async (uid, fid) => {
    const querySnapshot = await getDocs(collection(db, "users", uid, "folders", fid, "data"));
    let data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    let folders = []
    const q = query(collection(db, "users", uid, "folders"), where("idx", "==", fid.toString()));
    const query1 = await getDocs(q);
    query1 && query1?.forEach((doc) => {
        doc?.data()?.includes?.forEach(async(inc)=> {
            const snap = await getDoc(inc);
            folders.push(snap.data())

        })
    });
    console.log(data, folders)
    return [data, folders]
}

export const getUserProfile = async (uid) => {
    const docRef = doc(db, "cities", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

export const deleteUserData = async (uid, fid, did) => {
    await deleteDoc(doc(db, "users", uid, "folders", fid.toString(), 'data', did.toString()));
    return await deleteFile(uid, did);
}

export const deleteFolder = async (uid, fid) => {
    return await deleteDoc(doc(db, "users", uid, "folders", fid.toString()));
    // return await deleteFile(uid, did);
}

export const updateUserData = async (uid, did, data) => {
    const Ref = doc(db, "users", uid, "userData", did.toString());
    await updateDoc(Ref, {
        isFavorite: data
    });
}
