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

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "1":
                return "green"
            case "2":
                return "orange"
            case "3":
                return "red"
            default:
                return "black"
        }
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
                    {ctx.quote.difficulty && (
                        <Grid sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                        }}>
                            <Typography sx={{ fontSize: getFontSize('medium') }}>Difficulty</Typography>
                            <Typography sx={{
                                fontSize: getFontSize('medium'),
                                paddingLeft: 1,
                                color: findColor(getDifficultyColor(ctx.quote.difficulty)),
                            }}>{ctx.quote.difficulty}</Typography>
                        </Grid>
                    )}
                    <Grid sx={{
                        position: 'absolute',
                        top: 0,
                        left: 10,
                        display: 'flex',
                    }}>
                        {getImage('cinema.jpeg', 'auto', '12vh')}
                    </Grid>
                    {!answer ? (
                        ctx.quote && (<Typography sx={{ marginBottom: 3, fontSize: getFontSize('large') }}>"{ctx.quote.quote}"</Typography>)
                    ) : ( 
                        ctx.quote && (
                        <>
                            <Grid sx={{
                                position: 'absolute',
                                top: '14vh',
                                left: 25,
                                display: 'flex',
                            }}>
                                {getImage(ctx.quote?.image, 'auto', '42vh')}
                            </Grid>
                            <Grid sx={{
                                position: 'absolute',
                                top: '14vh',
                                left: '20vw',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                            }}>
                                <Typography sx={{ fontSize: getFontSize('large') }}>"{ctx.quote.quote}"</Typography>
                                <Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Movie : {ctx.quote.movie}</Typography>
                                {ctx.quote.character && (<Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Character : {ctx.quote.character}</Typography>)}
                                {ctx.quote.actor && (<Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Actor : {ctx.quote.actor}</Typography>)}
                            </Grid>
                        </>
                    ))}
                </Paper>
                <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                    {!answer ? (<Button sx={{
                        color: findColor('black'),
                        padding: 1,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: findColor('white'),
                        border: `1px solid ${findColor('black')}`,
                        '&:hover': {
                            backgroundColor: findColor('white'),
                        }
                    }}
                        onClick={() => showAnswer()}>
                        <VisibilityIcon />
                        <Typography sx={{ paddingLeft: 1 }}>Show Answer</Typography>
                    </Button>) : (<Button sx={{
                        color: findColor('black'),
                        padding: 1,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: findColor('white'),
                        border: `1px solid ${findColor('black')}`,
                        '&:hover': {
                            backgroundColor: findColor('white'),
                        }
                    }}
                        onClick={() => nextQuote()}>
                        <Typography sx={{ paddingLeft: 1 }}>Next Quote</Typography>
                        <NavigateNextIcon />
                    </Button>)}
                </Grid>
            </Grid>
        </Box>
    );
};
