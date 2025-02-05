import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
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
import { Version } from '../../utils/quote';
import { getDifficultyColor } from '../../utils/difficulty';
import { ClassicButton } from '../common/Classicbutton';
import { PageContainer } from '../common/PageContainer';

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

    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [answer]);

    const checkAnswer = () => {
        setAnswer(true);
        ctx.updateUserAnswer(userAnswer, ctx.currentQuote.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    const nextQuote = () => {
        setAnswer(false);
        if (ctx.index === ctx.quotes.length - 1) {
            navigate('/results')
        } else {
            ctx.incrementIndex();
            setUserAnswer('');
        }
    }

    return (
        <PageContainer>
            <Paper sx={{
                position: 'relative',
                width: '75vw',
                height: '65vh',
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
                    <Grid sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant="determinate"
                            value={(ctx.index + 1) * 100 / ctx.quotes.length}
                            style={{ width: '7vh', height: '7vh' }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: getFontSize('medium') }}
                            >{`${ctx.index + 1} / ${ctx.quotes.length}`}</Typography>
                        </Box>
                    </Grid>
                    {ctx.currentQuote?.difficulty && (
                        <Grid sx={{
                            color: findColor('white'),
                            backgroundColor: findColor(getDifficultyColor(ctx.currentQuote.difficulty)),
                            padding: 2,
                            marginRight: 1,
                            borderRadius: 2,
                            display: 'flex',
                            height: '5vh',
                            alignItems: 'center',
                        }}>
                            <Typography sx={{ fontSize: getFontSize('medium') }}>{ctx.getText('difficulty')}</Typography>
                            <Typography sx={{
                                fontSize: getFontSize('medium'),
                                paddingLeft: 1,
                            }}>{ctx.currentQuote.difficulty}</Typography>
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
                        ctx.currentQuote && (
                            <Grid item xs={9} sx={{ justifyContent: 'center', display: 'flex', marginRight: 2, marginLeft: 2 }}>
                                <Typography sx={{ fontSize: getFontSize('large') }}>
                                    "{ctx.currentQuote.quote[ctx.version as Version]}"
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
                                overflowY: 'auto',
                                maxHeight: '50vh',
                            }}>
                                {getImage(ctx.currentQuote.image, 'auto', '44vh')}
                                <ReactAudioPlayer
                                    src={`audio/${ctx.version}/2.mp3`}
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
                                overflowY: 'auto',
                                maxHeight: '50vh',
                            }}>
                                <Typography sx={{ fontSize: getFontSize('large') }}>"{ctx.currentQuote.quote[ctx.version as Version]}"</Typography>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow
                                                key="movie"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{ctx.getText('movie')}</TableCell>
                                                <TableCell align="center">{ctx.currentQuote.movie[ctx.version as Version]}</TableCell>
                                            </TableRow>
                                            <TableRow
                                                key="character"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{ctx.getText('character')}</TableCell>
                                                <TableCell align="center">{ctx.currentQuote.caracter || ''}</TableCell>
                                            </TableRow>
                                            <TableRow
                                                key="actor"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{ctx.getText('actor')}</TableCell>
                                                <TableCell align="center">{ctx.currentQuote.actor || ''}</TableCell>
                                            </TableRow>
                                            <TableRow
                                                key="guess"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{ctx.getText('user_guess')}</TableCell>
                                                <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                    {ctx.currentQuote.userAnswer || ''}
                                                    {ctx.computeSimilarity(ctx.currentQuote.movie[ctx.version as Version], ctx.currentQuote.userAnswer) > 0.6 ? (
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
                        minHeight: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 1,
                    }}>
                        <Grid container item xs={12} sx={{ justifyContent: 'space-between', display: 'flex', margin: 1 }}>
                            <Grid item xs={10.8}>
                                <TextField
                                    inputRef={textFieldRef}
                                    fullWidth
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Entrez votre réponse ici"
                                    onKeyDown={handleKeyDown}
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
                            <Grid item xs={1}>
                                <ClassicButton text='' action={() => checkAnswer()} icon={<ArrowCircleRightOutlinedIcon />} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
            <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                {answer && (
                    <ClassicButton text={ctx.index + 1 === ctx.quotes.length ? ctx.getText('see_results') : ctx.getText('next_quote')} action={() => nextQuote()} icon={<NavigateNextIcon />} />)}
            </Grid>
        </PageContainer>
    );
};
