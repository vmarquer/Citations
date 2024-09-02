import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../utils/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ReactAudioPlayer from 'react-audio-player';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const Game = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<Boolean>(false);
    const [userAnswer, setUserAnswer] = useState('');
    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, []);

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
            navigate('/')
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
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Grid item xs={12} sx={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Grid sx={{
                            paddingLeft: 1,
                        }}>
                            {getImage('cinema.jpeg', 'auto', '12vh')}
                        </Grid>
                        {ctx.quote.difficulty && (
                            <Grid sx={{
                                color: findColor('white'),
                                backgroundColor: findColor(getDifficultyColor(ctx.quote.difficulty)),
                                padding: 2,
                                marginRight: 1,
                                borderRadius: 2,
                                display: 'flex',
                                height: '5vh',
                                alignItems: 'center',
                            }}>
                                <Typography sx={{ fontSize: getFontSize('medium') }}>Difficulty</Typography>
                                <Typography sx={{
                                    fontSize: getFontSize('medium'),
                                    paddingLeft: 1,
                                }}>{ctx.quote.difficulty}</Typography>
                            </Grid>
                        )}
                    </Grid>
                    <Grid container item xs={12} sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 3,
                    }}>
                        {!answer ? (
                            ctx.quote && (
                                <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex', marginRight: 2, marginLeft: 2 }}>
                                    <Typography sx={{ fontSize: getFontSize('large') }}>
                                        "{ctx.quote.quote[ctx.language as 'vo' | 'vf']}"
                                    </Typography>
                                    <Grid />
                                </Grid>
                            )
                        ) : (
                            <Grid item xs={12} sx={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                                <Grid item xs={4} sx={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    height: '100%',
                                    alignItems: 'center',
                                }}>
                                    {getImage(ctx.quote.image, 'auto', '37vh')}
                                    <ReactAudioPlayer
                                        src={`audio/${ctx.language}/2.mp3`}
                                        controls
                                        style={{
                                            marginTop: '5px',
                                            width: '70%'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={7.8} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    marginRight: 2,
                                }}>
                                    <Typography sx={{ fontSize: getFontSize('large') }}>"{ctx.quote.quote[ctx.language as 'vo' | 'vf']}"</Typography>
                                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow
                                                    key="movie"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>Movie</TableCell>
                                                    <TableCell align="center">{ctx.quote.movie[ctx.language as 'vo' | 'vf']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key="character"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>Character</TableCell>
                                                    <TableCell align="center">{ctx.quote.character || ''}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key="actor"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>Actor</TableCell>
                                                    <TableCell align="center">{ctx.quote.actor || ''}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key="guess"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>Your guess</TableCell>
                                                    <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        {ctx.guessedQuotes[ctx.guessedQuotes.length - 1] || ''}
                                                        {ctx.computeSimilarity(ctx.quote.movie[ctx.language as 'vo' | 'vf'], ctx.guessedQuotes[ctx.guessedQuotes.length - 1]) > 0.7 ? (
                                                            <CheckIcon sx={{ color: findColor('green') }} />
                                                        ) : (
                                                            <ClearIcon sx={{ color: findColor('red') }} />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
                {!answer && (
                    <Grid item xs={12} pt={1}>
                        <Paper sx={{
                            height: '6vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 1,
                        }}>
                            <Grid container item xs={12} sx={{ justifyContent: 'space-between', display: 'flex', padding: 1 }}>
                                <Grid item xs={11}>
                                    <TextField
                                        inputRef={textFieldRef}
                                        fullWidth
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Entrez votre réponse ici"
                                        sx={{
                                            height: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: findColor('black'),
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: findColor('black'),
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: findColor('black'),
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={0.8}>
                                    <Button sx={{
                                        height: '100%',
                                        color: findColor('black'),
                                        backgroundColor: findColor('white'),
                                        borderRadius: 2,
                                        border: `1px solid ${findColor('black')}`,
                                        '&:hover': {
                                            backgroundColor: findColor('white'),
                                        }
                                    }}
                                        onClick={checkAnswer}>
                                        <ArrowCircleRightOutlinedIcon />
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
