import React from 'react';
import { Box, Button } from '@mui/material';
import { findColor } from '../../utils/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const ResultsButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname !== '/game') {
        return <></>
    }
    return (
        <Box sx={{
            position: 'fixed',
            top: 30,
            right: 30,
            color: findColor('black'),
            borderRadius: 1,
            zIndex: 1000,
        }}>
            <Button sx={{
                    width: '50px',
                    height: '60px',
                    color: findColor('white'),
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: findColor('yellow'),
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: findColor('yellow'),
                    }
                }}
                    onClick={() => navigate('/results')}>
                    <EmojiEventsIcon />
                </Button>
        </Box>
    );
};
