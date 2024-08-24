import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


export const Results = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <Box sx={{
            color: findColor('black'),
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: 'linear-gradient(135deg, #A1C6EA, #F7A9A8, #F4D06F, #B7E4C7, #C3AED6)',
        }}>
            <Grid item xs={12}>
                <Paper sx={{
                    position: 'relative',
                    width: '70vw',
                    height: '55vh',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Grid container item xs={12} justifyContent="center">
                        {ctx.guessedQuotes.map((_, index) => (
                            <>
                                <Grid item xs={3.5}>
                                    <Typography>{ctx.playedQuotes[index] || ''}</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography>{ctx.guessedQuotes[index] || ''}</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    { ctx.playedQuotes[index] === ctx.guessedQuotes[index] ? (
                                        <CheckIcon sx={{ color: findColor('green')}}/>
                                    ) : (<ClearIcon sx={{ color: findColor('red')}}/>)}
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Box>
    );
};
