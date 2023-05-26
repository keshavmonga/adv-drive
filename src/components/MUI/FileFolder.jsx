import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useStore, getcurrentUser } from '@FireContext';
import { icons , formatDate , formatName , niceBytes , GridItem } from '@constants'
import { gridSX , gridAvatarSX , gridButtonSX } from '../../scss/SX';
import IconButton from '@mui/material/IconButton';
import HocMenu from './HocMenu'
import Grid from '@mui/material/Unstable_Grid2';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { BsFillShareFill } from 'react-icons/bs'
import { MdFavoriteBorder } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePath } from '../../redux/slices/pathSlice.js'



export default function FileFolder({ metadata }) {

  const { path, pathName } = useSelector((state) => state.path.value)
  const dispatch = useDispatch();

  const { name, ext, size, date , did } = metadata;
  const type = { ...icons }
  const navigate = useNavigate();

  

  const hanleNavigate = () => {
    if (ext!=='folder') { return }
    const newPath = [...path, did]
    const newPathName = [...pathName, name]
    dispatch(updatePath({ path: newPath, pathName: newPathName }))
    navigate(`/home/folder/${did}`)
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
          <GridItem sx={{ justifyContent: 'start' , padding:0 }}>
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
            <IconButton sx={gridAvatarSX}><MdFavoriteBorder /></IconButton>
            <IconButton sx={gridAvatarSX}><AiFillEdit /></IconButton>
            <IconButton sx={gridAvatarSX}><AiFillDelete /></IconButton>
            <IconButton sx={gridAvatarSX}><BsFillShareFill /></IconButton>
            <HocMenu />
          </GridItem>
        </Grid>
      </Grid>
    </>
  );
}