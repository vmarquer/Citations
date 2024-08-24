import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <Box sx={{
            color: findColor('black'),
            backgroundColor: findColor('background'),
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Grid item xs={12}>
                <Paper sx={{
                    width: '50vw',
                    height: '40vh',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>Jeu des citations</Typography>
                    <Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}
                    onClick={()=> navigate('/game')}>
                        <PlayCircleOutlineIcon />
                        <Typography sx={{ paddingLeft: 1 }}>START</Typography>
                    </Button>
                </Paper>
            </Grid>
        </Box>
    );
};
