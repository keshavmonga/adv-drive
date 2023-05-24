import React from 'react'
import ButtonMenu from './MenuButton';
import { Avatar } from '@mui/material';
import { useAuth, getcurrentUser } from '@FireContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { BsFillShareFill } from 'react-icons/bs'
import { MdFavoriteBorder } from 'react-icons/md'
import Logout from '@mui/icons-material/Logout';

const MenuButton = ({ type }) => {

    const { logOut } = useAuth();
    const currentUser = getcurrentUser();

    if (type === 'profile') {
        const main = <Avatar src={currentUser?.photoURL} sx={{ width: 32, height: 32 }}>M</Avatar>;
        const actions =
            [
                { icon: <Avatar />, name: 'Profile', action: () => { inputRef.current.click() } },
                { icon: <Avatar />, name: 'My Account', action: () => { } },
                { icon: <Logout fontSize="small" />, name: 'Logout', action: logOut },
            ]
        return <ButtonMenu type={type} main={main} actions={actions} />
    } else {
        const main = <MoreVertIcon />
        const actions =
            [
                { icon: <MdFavoriteBorder fontSize="medium" />, name: 'Favorite', action: () => { } },
                { icon: <AiFillEdit fontSize="medium"/>, name: 'Rename', action: () => { } },
                { icon: <BsFillShareFill fontSize="medium"/>, name: 'Share', action: () => { } },
                { icon: <AiFillDelete fontSize="medium"/>, name: 'Delete', action: () => { } },
            ]
        return <ButtonMenu type={type} main={main} actions={actions} />
    }


}

export default MenuButton
