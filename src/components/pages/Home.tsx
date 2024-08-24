import React, { useContext, useEffect } from 'react';
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

    const startGame = () => {
        ctx.initializeQuotes();
        ctx.drawQuote();
        navigate('/game');
    }

    return (
        <Box sx={{
            color: findColor('black'),
            background: 'linear-gradient(135deg, #A1C6EA, #F7A9A8, #F4D06F, #B7E4C7, #C3AED6)',
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Grid item xs={12}>
                <Paper sx={{
                    width: '40vw',
                    height: '30vh',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title'), fontWeight: 'bold' }}>Jeu des citations</Typography>
                    <Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`,
                        '&:hover': {
                            backgroundColor: findColor('white'),
                        }
                    }}
                        onClick={() => startGame()}>
                        <PlayCircleOutlineIcon />
                        <Typography sx={{ paddingLeft: 1 }}>START</Typography>
                    </Button>
                </Paper>
            </Grid>
        </Box>
    );
};
