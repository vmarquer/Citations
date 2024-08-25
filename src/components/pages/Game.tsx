import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../utils/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export const Game = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<Boolean>(false);
    const [userAnswer, setUserAnswer] = useState('');

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "1":
                return "green"
            case "2":
                return "yellow"
            case "3":
                return "red"
            default:
                return "black"
        }
    }

    const checkAnswer = () => {
        setAnswer(true);
        ctx.updateGuessedQuotes(userAnswer);
        ctx.updatePlayedQuotes(ctx.quote);
    };

    const nextQuote = () => {
        setAnswer(false);
        if (ctx.quotes.length === 0) {
            navigate('/home')
        }
        ctx.drawQuote();
        setUserAnswer('');
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
                            color: findColor('white'),
                            backgroundColor: findColor(getDifficultyColor(ctx.quote.difficulty)),
                            padding: 1,
                            borderRadius: 2,
                        }}>
                            <Typography sx={{ fontSize: getFontSize('medium') }}>Difficulty</Typography>
                            <Typography sx={{
                                fontSize: getFontSize('medium'),
                                paddingLeft: 1,
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
                            <Grid container spacing={2} sx={{ position: 'relative', top: '5vh' }}>
                                <Grid item xs={4} sx={{ display: 'flex' }}>
                                    {getImage(ctx.quote.image, 'auto', '42vh')}
                                </Grid>
                                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: getFontSize('large') }}>"{ctx.quote.quote}"</Typography>
                                    <Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Movie: {ctx.quote.movie}</Typography>
                                    {ctx.quote.character && (
                                        <Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Character: {ctx.quote.character}</Typography>
                                    )}
                                    {ctx.quote.actor && (
                                        <Typography sx={{ fontSize: getFontSize('large'), paddingTop: 2 }}>Actor: {ctx.quote.actor}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                        )
                    )}
                </Paper>
                {!answer && (
                    <Grid item xs={12} pt={1}>
                        <Paper sx={{
                            height: '8vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Grid container spacing={2} sx={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                <Grid item xs={11}>
                                    <TextField
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Entrez votre réponse ici" />
                                </Grid>
                                <Grid item xs={1}>
                                    <Button sx={{
                                        color: findColor('black'),
                                        padding: 1,
                                        display: "flex",
                                        width: '100%',
                                        justifyContent: "center",
                                        backgroundColor: findColor('white'),
                                        border: `1px solid ${findColor('black')}`,
                                        '&:hover': {
                                            backgroundColor: findColor('white'),
                                        }
                                    }}
                                        onClick={checkAnswer}>
                                        <ArrowCircleRightIcon sx={{fontSize: '4vh'}} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
                <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                    {answer && (<Button sx={{
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
