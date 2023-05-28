import { firebaseApp } from "../Firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, where, query, deleteDoc, arrayUnion, arrayRemove, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const getFileRef = (uid, folderId, documentId) =>
    doc(db, "users", uid, "folders", folderId.toString(), 'data', documentId.toString())

const getFolderRef = (uid, folderId) =>
    doc(db, "users", uid, "folders", folderId.toString())

const getFilesRef = (uid, fid) =>
    collection(db, "users", uid, "folders", fid, "data")


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
    await setDoc(getFileRef(uid, fid.toString(), time.toString()), {
        ...metadata,
        name: getFileExtension(metadata.name)[0],
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

export const createFolder = async (uid, name, folderId) => {
    const date = new Date();
    const time = date.getTime()

    await setDoc(getFolderRef(uid, time.toString()), {
        idx: time.toString(),
        name,
        createdOn: date,
        ext: 'folder',
    });

    await updateDoc(getFolderRef(uid, folderId.toString()),
        {
            includes: arrayUnion(time.toString())
        });
}

export const getUserData = async (uid, fid) => {
    let folders = []
    let data = []
    const query1 = await getDoc(getFolderRef(uid, fid.toString()))
    query1?.data()?.includes?.forEach(async (inc) => {
        const snap = await getDoc(getFolderRef(uid, inc))
        folders.push(snap?.data())
    })

    const querySnapshot = await getDocs(getFilesRef(uid, fid));
    querySnapshot.forEach((doc) => {
        data?.push(doc?.data())
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

export const deleteUserFile = async (uid, fid, did) => {
    await deleteDoc(getFileRef(uid, fid.toString(), did.toString()));
    // return await deleteFile(uid, did);
}

export const deleteFolder = async (uid, fid, parent) => {
    const folderRef = getFolderRef(uid, fid)

    await updateDoc(getFolderRef(uid, parent.toString()),
        {
            includes: arrayRemove(fid.toString())
        });

    const folderSnapshot = await getDoc(folderRef)

    folderSnapshot?.data()?.includes?.forEach(async (inc) => {
        deleteFolder(uid, inc, fid)
    })
    return await deleteDoc(folderRef);
    // return await deleteFile(uid, did);
}

export const updateUserData = async (uid, did, data) => {
    const Ref = doc(db, "users", uid, "userData", did.toString());
    await updateDoc(Ref, {
        isFavorite: data
    });
}

export const renameDoc = async (uid, did, parent, ext, data) => {
    const ref = ext === 'folder'
        ? getFolderRef(uid, did)
        : getFileRef(uid, parent, did)

    await updateDoc(ref, {
        name: data
    });
}
