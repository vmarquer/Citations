import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';

export const Game = () => {
    const ctx = useContext(AppContext);

    return (
        <Box sx={{
            color: findColor('black'),
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Grid item xs={12}>
                <Paper sx={{
                    width: '50vw',
                    height: '35vh',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>Game</Typography>
                    <Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}>
                        <PlayCircleOutlineIcon />
                        <Typography sx={{ paddingLeft: 1 }}>START</Typography>
                    </Button>
                </Paper>
                {ctx.quotes.length > 0 ? (
                    ctx.quotes.map((quote, index) => (
                        <Typography key={index}>{quote.quote}</Typography>))) : (
                    <Typography>No quotes available.</Typography>
                )}
            </Grid>
        </Box>
    );
};
