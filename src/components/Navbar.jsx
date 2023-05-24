import { Chip, Avatar, Button } from '@constants'
import { HocMenu, SearchBar, HideL, HideS } from '@components/MUI'
import React from 'react'
import { useAuth } from "@FireContext"


const Navbar = ({ name, img }) => {
    const { logOut } = useAuth();
    return (
        <>
            <div className='brand'>
                <h2 style={{ color: '#8739F9' }}>MyDrive</h2>
            </div>
            <HideS>
                <div className='rnav'>
                    <SearchBar />
                    <Chip color="primary" sx={{ bgcolor: '#8739F9' }} avatar={<Avatar src={img} />} label={name} />
                    <Button sx={{ color: '#8739F9' }} onClick={logOut}>Logout</Button>
                </div>
            </HideS>
            <HideL>
                <div className='r_nav'>
                    <SearchBar override={{ width: '7rem' }} />
                    <HocMenu type='profile' />
                </div>
            </HideL>
        </>
    )
}

export default Navbar
