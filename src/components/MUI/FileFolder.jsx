import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useStore, getcurrentUser } from '@FireContext';
import { icons } from '@constants'
import { ButtonBase } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import HocMenu from './HocMenu'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { BsFillShareFill } from 'react-icons/bs'
import { MdFavoriteBorder } from 'react-icons/md'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  background: '#F2F5F5',
  textAlign: 'center',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
  height: '3rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  fontSize: 'large',
  boxShadow: 'none',
}));

export default function FileFolder({ metadata }) {

  const { name, ext, size, date } = metadata;
  const type = { ...icons }

  const formatDate = time => {
    const date = new Date(time)
    return date?.toLocaleDateString();
  }
  const formatName = name => {
    if (name?.lengh < 25) { return name }
    else { name = name.substr(0, 22) }
    return name + '.';
  }

  function niceBytes(x) {
    if (x==='-') {return '-'}
    const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  const gridSX = {
    borderBottom: '1px solid grey',
    '&:hover': {
      backgroundColor: 'lightgrey',
    }
  }
  const buttonSx = {
    gap: `max(1rem , calc(100% - 38rem))`,
  }
  const AvatarSX = {
    display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
    backgroundColor: '#F2F5F5',
    borderRadius: 3,
    '&:hover': {
      boxShadow: 2
    }
  }
  const responsive = { xs: 'none', sm: 'none', md: 'flex' }


  return (
    <>
        <Grid container sx={gridSX} justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid xs={3} sm={1}>
            <Item><Avatar >{type[ext][0] || ext}</Avatar>
            </Item>
          </Grid>
          <Grid xs sm={3.5}>
            <Item sx={{ justifyContent: 'start' }}>
              {formatName(name) + ext}
            </Item>
          </Grid>
          <Grid xs sm display={responsive}>
            <Item>
              {niceBytes(size)}
            </Item>
          </Grid>
          <Grid xs sm display={responsive}>
            <Item>
              {formatDate(date)}
            </Item>
          </Grid>
          <Grid xs={2} sm={4} >
            <Item sx={buttonSx}>
              <IconButton sx={AvatarSX}><MdFavoriteBorder /></IconButton>
              <IconButton sx={AvatarSX}><AiFillEdit /></IconButton>
              <IconButton sx={AvatarSX}><AiFillDelete /></IconButton>
              <IconButton sx={AvatarSX}><BsFillShareFill /></IconButton>
              <HocMenu />
            </Item>
          </Grid>
        </Grid>
    </>
  );
}