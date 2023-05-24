import { Box } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = ({override}) => {
    const SearchSX = {
        height: '2.3rem',
        width: "14rem",
        bgcolor: "white",
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        border: '2px solid #8739F9',
        "&:hover": {
            boxShadow: 2
        },
        ...override
    }
    const handleSearch = () => { }
    return (
        <Box sx={SearchSX}>
            <SearchOutlinedIcon sx={{ color: 'action.active', ml: 1, mt: 0.3 }} />
            <input onChange={handleSearch} type="text" placeholder='Search...' id="search" />
        </Box>
    )
}

export default SearchBar
