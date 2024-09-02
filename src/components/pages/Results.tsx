import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor } from '../../utils/colors';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


export const Results = () => {
    const ctx = useContext(AppContext);

    function createData(
        quote: string,
        movie: string,
        userAnswer: string,
        difficulty: string,
        similarity: number,
    ) {
        return { quote, movie, userAnswer, difficulty, similarity };
    }

    const rows = ctx.playedQuotes.map((quote, index) => createData(quote.quote.vo, quote.movie.vo, ctx.guessedQuotes[index], quote.difficulty, ctx.computeSimilarity(ctx.quote.movie[ctx.language as 'vo' | 'vf'], ctx.guessedQuotes[index])))

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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Quote</TableCell>
                                        <TableCell align="center">Movie</TableCell>
                                        <TableCell align="center">User answer</TableCell>
                                        <TableCell align="center">Difficulty</TableCell>
                                        <TableCell align="center">Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.quote}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.quote}</TableCell>
                                            <TableCell align="center">{row.movie}</TableCell>
                                            <TableCell align="center">{row.userAnswer}</TableCell>
                                            <TableCell align="center">{row.difficulty}</TableCell>
                                            <TableCell align="center">{row.similarity > 0.7 ? (<CheckIcon sx={{ color: findColor('green')}}/>) : (<ClearIcon sx={{ color: findColor('red')}}/>)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
            </Grid >
        </Box >
    );
};
