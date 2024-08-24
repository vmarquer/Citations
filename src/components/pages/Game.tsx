import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../utils/image';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Game = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<Boolean>(false);

    const showAnswer = () => {
        setAnswer(true);
    }

    const nextQuote = () => {
        setAnswer(false);
        if (ctx.quotes.length === 0) {
            navigate('/home')
        }
        ctx.drawQuote();
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
                    {ctx.quote ? (<Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>{ctx.quote.quote}</Typography>) : (
                        <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>No quote available</Typography>
                    )}
                    {answer && (
                        <>
                            <Typography sx={{ marginBottom: 3, fontSize: getFontSize('title') }}>{ctx.quote?.character}</Typography>
                            {getImage(ctx.quote?.image, '10vw', 'auto')}
                        </>
                    )}
                </Paper>
                <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                    {!answer ? (<Button sx={{
                        color: findColor('black'),
                        padding: 1,
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}
                        onClick={() => showAnswer()}>
                        <VisibilityIcon />
                        <Typography sx={{ paddingLeft: 1 }}>Show Answer</Typography>
                    </Button>) : (<Button sx={{
                        color: findColor('black'),
                        padding: 1,
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`
                    }}
                        onClick={() => nextQuote()}>
                        <Typography sx={{ paddingLeft: 1 }}>Next Quote</Typography>
                        <NavigateNextIcon />
                    </Button>)}
                    {ctx.quotes.length}
                    {ctx.quote && ('OK')}
                </Grid>
            </Grid>
        </Box>
    );
};
