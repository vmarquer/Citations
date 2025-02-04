import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { texts } from '../../utils/language';
import { Version } from '../../utils/quote';
import { Quiz } from '../../utils/quiz';
import { EnumSelector } from '../common/EnumSelector';

export const Home = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const imageStyle = { width: '3vh', height: '3vh' };

    const handleVersion = (event: SelectChangeEvent) => {
        ctx.updateVersion(event.target.value as Version);
    };

    const handleQuizType = (event: SelectChangeEvent) => {
        ctx.updateQuizType(event.target.value as Quiz);
    };

    const startGame = () => {
        ctx.launchQuiz();
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
                    minWidth: '350px',
                    height: '30vh',
                    minHeight: '200px',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ marginBottom: 2, fontSize: getFontSize('title'), fontWeight: 'bold' }}>{ctx.getText('app_title')}</Typography>
                    <Grid item xs={12} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <EnumSelector images={true} value={ctx.quizType} values={Quiz} onChange={handleQuizType} />
                        <EnumSelector images={true} value={ctx.version} values={Version} onChange={handleVersion} />
                        <Button sx={{
                            color: findColor('black'),
                            display: "flex",
                            height: "100%",
                            justifyContent: "center",
                            border: `1px solid ${findColor('black')}`,
                            '&:hover': {
                                backgroundColor: findColor('white'),
                            }
                        }}
                            onClick={() => startGame()}>
                            <Typography sx={{ paddingRight: 1 }}>{ctx.getText('start')}</Typography>
                            <PlayCircleOutlineIcon />
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Box>
    );
};
