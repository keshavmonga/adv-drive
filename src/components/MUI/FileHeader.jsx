import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


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

export default function FileHeader() {

    const sx = {
        backgroundColor: 'transparent',
        height: '1rem',
    }
    const gridSX = {
        borderBottom: '1px solid grey',
    }
    const responsive = { xs: 'none', sm: 'none', md: 'flex' }


    return (
        <>
            <Box sx={{ width: '100%', margin: 'auto' }}>
                <Grid container justifyContent="center" rowSpacing={1} sx={gridSX} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid xs sm={4.5}>
                        <Item sx={sx}>name</Item></Grid>
                    <Grid xs sm display={responsive}>
                        <Item sx={sx}>size</Item>
                    </Grid>
                    <Grid xs sm display={responsive}>
                        <Item sx={sx}>Date</Item>
                    </Grid>
                    <Grid xs={2} sm={4}>
                        <Item sx={sx}>More</Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}