import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePath } from '../../redux/slices/pathSlice';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
      cursor: 'pointer',
    }
  };
});


export default function CustomizedBreadcrumbs() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { path, pathName } = useSelector((state) => state.path.value)

  const handleClick = (i)=> {
    const newPath = path.slice(0,i+1)
    const newPathName = pathName.slice(0,i+1)
    dispatch(updatePath({path:newPath,pathName:newPathName}))
    navigate(`/home/folder/${path[i]}`)
  }

  const handleHome = () => {
    dispatch(updatePath({path:[],pathName:[]}))
    navigate(`/home`)
  }

  return (
    <div role="presentation" style={{background:'black'}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{height:'3rem' , marginTop:8 , borderTop:'1px solid #8739F9', borderBottom:'1px solid #8739F9'}}>
        <StyledBreadcrumb
          sx={pathName.length===0?{backgroundColor: emphasize("#dcdbdb94", 0.05)}:{}}
          component="a"
          onClick={handleHome}
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {pathName.map((name , i ) => (
        <StyledBreadcrumb
        sx={i===pathName.length-1?{backgroundColor: emphasize("#dcdbdb94", 0.05)}:{}}
          key={name}
          onClick={() => { handleClick(i) }}
          label={name}
          component="a"
        />))}
      </Breadcrumbs>
    </div>
  );
}