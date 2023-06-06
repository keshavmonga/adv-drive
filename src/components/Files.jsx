import React, { useEffect, useState } from 'react'
import { FileFolder, SnackBar, Portal, Loader } from '@components/MUI'
import { useStore, getcurrentUser } from '@FireContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loading } from '../redux/slices/loaderSlice.js'
import { Box } from '@mui/material'
import arrow from '../assets/arrow.svg'
import nodata from '../assets/nodata.svg'
import FileHeader from './MUI/FileHeader.jsx'

const Files = () => {

  const [data, setdata] = useState(null);
  const { did, ext } = useSelector((state) => state.selectedData.value)
  const update = useSelector((state) => state.update.value)
  const { getUserData, renameDoc } = useStore();
  const currentUser = getcurrentUser();
  const folderId = useParams().folderId ?? 'home';
  const dispatch = useDispatch();


  const getProps = (doc) => {
    return {
      size: doc?.size ?? '-',
      isFavorite: doc?.isFavorite ?? null,
      did: doc?.idx,
      uid: currentUser?.uid,
      url: doc?.downloadUrl || doc.idx,
      name: doc?.displayName ?? doc?.name,
      ext: doc?.ext,
      date: doc?.uploadedOn?.seconds * 1000 || doc?.createdOn?.seconds * 1000,
    }
  }

  const getData = async () => {
    const [a, b] = await getUserData(currentUser?.uid, folderId);
    setdata({ a, b })
  }

  const handleRename = async (name) => {
    await renameDoc(currentUser.uid, did, folderId, ext, name)
  }

  useEffect(() => {
    getData()
    dispatch(loading(false))
  }, [folderId, update]);

  return (
    <>
      <Loader />
      <Portal
        fn={handleRename}
        placeholder='Enter new name'
        title='rename'
      />
      <div className='files'>
        <Box sx={{ width: '100%', margin: 'auto' }}>
          <FileHeader />
          {!data?.a.length && !data?.b.length &&
            <>
              <div className="nodata">
                <img src={nodata} alt="Empty" />
                <p>Nothing to show  Here</p>
              </div>
              <p style={{ position: 'fixed', bottom: 58, right: 180 }}>
                Click here <br /> to upload
              </p>
              <img className='arrow' src={arrow} alt="below" />
            </>
          }
          {data?.b?.map(folder =>
            <FileFolder
              key={folder?.idx}
              metadata={getProps(folder)}
            />
          )}
          {data?.a?.map(file =>
            <FileFolder
              key={file?.idx}
              metadata={getProps(file)}
            />
          )}
        </Box>
      </div>
      <SnackBar />
    </>
  )
}

export default Files
