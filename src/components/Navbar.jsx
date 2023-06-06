import { Chip, Avatar, Button } from '@constants'
import { SearchBar } from '@components/MUI'
import React from 'react'
import { useAuth } from "@FireContext"
import { Logout } from '../utils/icons'
import ButtonMenu from './MUI/MenuButton'
import { Box } from '@mui/material'


const Navbar = ({ name, img }) => {
    const { logOut } = useAuth();
    const main = <Avatar src={img} sx={{ width: 32, height: 32 }}>M</Avatar>;
    const actions =
        [
            { icon: <Avatar />, name: 'Profile', action: () => { } },
            { icon: <Avatar />, name: 'My Account', action: () => { } },
            { icon: <Logout size='1.35em'/>, name: 'Logout', action: logOut },
        ]

    return (
        <>
            <div className='brand'>
                <h2 style={{ color: '#8739F9' }}>MyDrive</h2>
            </div>
            <Box display={{ xs: 'none', sm: 'flex' }}>
                <div className='rnav'>
                    <SearchBar />
                    <Chip color="primary" sx={{ bgcolor: '#8739F9' }} avatar={<Avatar src={img} />} label={name} />
                    <Button sx={{ color: '#8739F9' }} onClick={logOut}>Logout</Button>
                </div>
            </Box>
            <Box display={{ xs: 'flex', sm: 'none' }}>
                <div className='r_nav'>
                    <SearchBar override={{ width: '7rem' }} />
                    <ButtonMenu type='profile' main={main} actions={actions} />
                </div>
            </Box>
        </>
    )
}

export default Navbar
