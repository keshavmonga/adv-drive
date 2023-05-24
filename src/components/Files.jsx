import React, { useEffect, useState } from 'react'
import { FileFolder, Loader, SnackBar, HocMenu } from '@components/MUI'
import { useStore, getcurrentUser } from '@FireContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loading } from '../redux/slices/loaderSlice.js'
import { updatePath } from '../redux/slices/pathSlice.js'
import { Box } from '@mui/material'
import FileHeader from './MUI/FileHeader.jsx'

const Files = () => {

  let { folderId } = useParams();

  if (folderId === undefined) { folderId = 'home' }

  const loader = useSelector((state) => state.loader.value)
  const { path, pathName } = useSelector((state) => state.path.value)
  const dispatch = useDispatch();
  const [data, setdata] = useState(null);


  const navigate = useNavigate();

  const getProps = (doc, type) => {
    if (type === 'folder') {
      return {
        size: '-',
        did: doc.idx,
        uid: currentUser?.uid,
        url: doc.idx,
        name: doc.name,
        ext: doc.ext,
        date: doc.createdOn?.seconds * 1000,
      }
    }
    return {
      size: doc.size,
      isFavorite: doc.isFavorite,
      did: doc.idx,
      uid: currentUser?.uid,
      url: doc.downloadUrl,
      name: doc.displayName,
      ext: doc.ext,
      date: doc.uploadedOn?.seconds * 1000,
    }
  }


  const currentUser = getcurrentUser();

  const { getUserData } = useStore();

  const handle = async () => {
    const [a, b] = await getUserData(currentUser?.uid, folderId);
    setdata({a,b})
  }

  const handlenav = (idx, fname) => {
    const newPath = [...path, idx]
    const newPathName = [...pathName, fname]
    dispatch(updatePath({ path: newPath, pathName: newPathName }))
    navigate(`/home/folder/${idx}`)
  }


  useEffect(() => {
    handle()
  }, [folderId]);

  return (
    <>
      <Loader />
      <div className='files'>
        <Box sx={{ width: '100%', margin: 'auto' }}>
          <FileHeader />
          {data?.b?.map(folder => (<FileFolder key={folder?.idx} metadata={getProps(folder, 'folder')} />))}
          {data?.a?.map(file => (<FileFolder key={file?.idx} metadata={getProps(file, 'file')} />))}
        </Box>
      </div>
      <SnackBar />
    </>
  )
}

export default Files
