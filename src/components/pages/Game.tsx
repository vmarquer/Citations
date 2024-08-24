import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';

export const Game = () => {
    const ctx = useContext(AppContext);
    const [answer, setAnswer] = useState<Boolean>(false);

    const showAnswer = () => {
        setAnswer(true);
    }

    const nextQuote = () => {
        setAnswer(false);
    }

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
                    <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>{ctx.quote?.quote}</Typography>
                    {answer && (<Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>{ctx.quote?.character}</Typography>)}
                </Paper>
                <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                    {!answer ? (<Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}
                        onClick={() => showAnswer()}>
                        <Typography sx={{ paddingLeft: 1 }}>Show Answer</Typography>
                    </Button>) : (<Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}
                        onClick={() => nextQuote()}>
                        <Typography sx={{ paddingLeft: 1 }}>Next Quote</Typography>
                    </Button>)}
                </Grid>
            </Grid>
        </Box>
    );
};
