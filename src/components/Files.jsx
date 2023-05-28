import React, { useEffect, useState } from 'react'
import { FileFolder, SnackBar } from '@components/MUI'
import { useStore, getcurrentUser } from '@FireContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loading } from '../redux/slices/loaderSlice.js'
import { Box } from '@mui/material'
import arrow  from '../assets/arrow.svg'
import nodata from '../assets/nodata.svg'
import FileHeader from './MUI/FileHeader.jsx'

const Files = () => {

  const [data, setdata] = useState(null);
  const currentUser = getcurrentUser();
  const { getUserData } = useStore();
  let { folderId } = useParams();

  if (folderId === undefined) { folderId = 'home' }

  const update = useSelector((state) => state.update.value)
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

  useEffect(() => {
    getData()
    dispatch(loading(false))
  }, [folderId, update]);

  return (
    <>
      <div className='files'>
        <Box sx={{ width: '100%', margin: 'auto' }}>
          <FileHeader />
          {!data?.a.length && !data?.b.length &&
            <>
            <div className="nodata">
              <img src={nodata} alt="Empty" />
              <p>Nothing to see Here</p>
            </div>
              <p style={{ position: 'fixed', bottom: 58, right: 180 }}>
                Click here <br /> to upload
              </p>
              <img className='arrow' src={arrow} alt="below" />
            </>
          }
          {data?.b?.map(folder => <FileFolder key={folder?.idx} metadata={getProps(folder)} />)}
          {data?.a?.map(file => <FileFolder key={file?.idx} metadata={getProps(file)} />)}
        </Box>
      </div>
      <SnackBar />
    </>
  )
}

export default Files
