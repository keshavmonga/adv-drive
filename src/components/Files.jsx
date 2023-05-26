import React, { useEffect, useState } from 'react'
import { FileFolder, Loader, SnackBar, HocMenu } from '@components/MUI'
import { useStore, getcurrentUser } from '@FireContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loading } from '../redux/slices/loaderSlice.js'
import { Box } from '@mui/material'
import FileHeader from './MUI/FileHeader.jsx'

const Files = () => {

  const currentUser = getcurrentUser();
  
  const { getUserData } = useStore();

  let { folderId } = useParams();

  if (folderId === undefined) { folderId = 'home' }
  
  const loader = useSelector((state) => state.loader.value)
  const update = useSelector((state) => state.update.value)
  const dispatch = useDispatch();

  const [data, setdata] = useState(null);



  const getProps = (doc) => {
    return {
      size: doc?.size ?? '-',
      isFavorite: doc?.isFavorite ?? null ,
      did: doc?.idx,
      uid: currentUser?.uid,
      url: doc?.downloadUrl || doc.idx,
      name: doc?.displayName ?? doc?.name,
      ext: doc?.ext,
      date: doc?.uploadedOn?.seconds * 1000 || doc?.createdOn?.seconds * 1000,
    }
  }



  const handle = async () => {
    const [a, b] = await getUserData(currentUser?.uid, folderId);
    setdata({a,b})
  }


  useEffect(() => {
    handle()
    dispatch(loading(false))
  }, [folderId,update]);

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
