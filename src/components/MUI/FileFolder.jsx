import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useStore } from '@FireContext';
import { formatDate, formatName, niceBytes, GridItem } from '@constants'
import { fileIcons, Edit, Delete, Share, Favorite } from '../../utils/icons'
import { gridSX, gridAvatarSX, gridButtonSX } from '../../scss/SX';
import IconButton from '@mui/material/IconButton';
import HocMenu from './HocMenu'
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePath } from '../../redux/slices/pathSlice.js'
import { refresh } from '../../redux/slices/updateSlice';
import { toggle } from '../../redux/slices/portalSlice';



export default function FileFolder({ metadata }) {

  const { path, pathName } = useSelector((state) => state.path.value)
  const { deleteFolder, deleteUserFile } = useStore();

  const parent = path[path.length - 1] ?? 'home'

  const { uid, name, ext, size, date, did, url } = metadata;
  const type = { ...fileIcons }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanleNavigate = () => {
    if (ext !== 'folder') {
      // handleDownload();
      return;
    }
    const newPath = [...path, did]
    const newPathName = [...pathName, name]
    dispatch(updatePath({ path: newPath, pathName: newPathName }))
    navigate(`/home/folder/${did}`)
  }
  

  const handleShare = () => {  }


  const handleFavorite = () => {}


  const handleRename = () => {}


  const handleDelete = async () => {
    ext === 'folder'
      ? await deleteFolder(uid, did, parent)
      : await deleteUserFile(uid, parent, did)

    dispatch(refresh());
  }

  const responsive = { xs: 'none', sm: 'none', md: 'flex' }


  return (
    <>
      <Grid container sx={gridSX} justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
        <Grid xs={3} sm={3} md={1}>
          <GridItem><Avatar >{type[ext][0] || ext}</Avatar>
          </GridItem>
        </Grid>
        <Grid xs sm md={3.5}>
          <GridItem sx={{ justifyContent: 'start', padding: 0 }}>
            <button onClick={hanleNavigate} className='file-button'>
              {formatName(name) + `${ext === 'folder' ? '' : `.${ext}`}`}
            </button>
          </GridItem>
        </Grid>
        <Grid xs sm md display={responsive}>
          <GridItem>
            {niceBytes(size)}
          </GridItem>
        </Grid>
        <Grid xs sm md={2} display={responsive}>
          <GridItem>
            {formatDate(date)}
          </GridItem>
        </Grid>
        <Grid xs={2} sm={2} md={4}>
          <GridItem sx={gridButtonSX}>
            <IconButton onClick={handleFavorite} sx={gridAvatarSX}><Favorite /></IconButton>
            <IconButton onClick={handleRename} sx={gridAvatarSX}><Edit /></IconButton>
            <IconButton onClick={handleDelete} sx={gridAvatarSX}><Delete /></IconButton>
            <IconButton onClick={handleShare} sx={gridAvatarSX}><Share /></IconButton>
            <HocMenu />
          </GridItem>
        </Grid>
      </Grid>
    </>
  );
}