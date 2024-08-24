import React from 'react';
import { Box, Button } from '@mui/material';
import { findColor } from '../../utils/colors';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from 'react-router-dom';

export const HomeButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/home') {
        return <></>
    }
    return (
        <Box sx={{
            position: 'fixed',
            top: 30,
            left: 30,
            color: findColor('black'),
            borderRadius: 1,
            zIndex: 1000,
        }}>
            <Button sx={{
                width: '50px',
                height: '60px',
                color: findColor('black'),
                display: "flex",
                justifyContent: "center",
                backgroundColor: findColor('white'),
                borderRadius: '50%',
                '&:hover': {
                    backgroundColor: findColor('white'),
                }
            }}
                onClick={() => navigate('/home')}>
                <HomeIcon />
            </Button>
        </Box>
    );
};
