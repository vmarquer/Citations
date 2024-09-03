import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { findColor, getResultColor } from '../../utils/colors';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Version } from '../../utils/quote';
import { getImage } from '../../utils/image';
import { getFontSize } from '../../utils/fontsizes';
import { getDifficultyColor } from '../../utils/difficulty';


export const Results = () => {
    const ctx = useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    function createData(
        quote: string,
        movie: string,
        userAnswer: string,
        difficulty: string,
        result: boolean,
        image: string,
    ) {
        return { quote, movie, userAnswer, difficulty, result, image };
    }

    const rows = ctx.playedQuotes.map((quote, index) => createData(
        quote.quote[ctx.version as Version],
        quote.movie[ctx.version as Version],
        ctx.guessedQuotes[index], quote.difficulty,
        ctx.computeSimilarity(quote.movie[ctx.version as Version], ctx.guessedQuotes[index]) > 0.6,
        quote.image))

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, image: string) => {
        setAnchorEl(event.currentTarget);
        setHoveredImage(image);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredImage(null);
    };

    const open = Boolean(anchorEl);

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
                    height: '70vh',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ fontSize: getFontSize('large'), marginBottom: 2, alignItems: 'center', display: 'flex' }}>{ctx.getText('result')} :
                        <Grid sx={{ position: 'relative', display: 'inline-flex', marginLeft: 2 }}>
                            <CircularProgress
                                variant="determinate"
                                value={rows.filter(row => row.result).length * 100 / rows.length}
                                style={{ width: '7vh', height: '7vh' }}
                                sx={{ color: getResultColor(rows.filter(row => row.result).length * 100 / rows.length) }}
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
                                    sx={{
                                        fontSize: getFontSize('medium'),
                                        color: getResultColor(rows.filter(row => row.result).length * 100 / rows.length)
                                    }}
                                >{`${rows.filter(row => row.result).length} / ${rows.length}`}</Typography>
                            </Box>
                        </Grid>
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">{ctx.getText('quote')}</TableCell>
                                    <TableCell align="center">{ctx.getText('movie')}</TableCell>
                                    <TableCell align="center">{ctx.getText('user_guess')}</TableCell>
                                    <TableCell align="center">{ctx.getText('difficulty')}</TableCell>
                                    <TableCell align="center">{ctx.getText('result')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.quote}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>"{row.quote}"</TableCell>
                                        <TableCell
                                            align="center"
                                            onMouseEnter={(e) => handlePopoverOpen(e, row.image)}
                                            onMouseLeave={handlePopoverClose}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {row.movie}
                                        </TableCell>
                                        <TableCell align="center">{row.userAnswer}</TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{
                                                fontSize: getFontSize('medium'),
                                                color: findColor('white'),
                                                backgroundColor: findColor(getDifficultyColor(row.difficulty)),
                                                height: '25px',
                                                width: '25px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>{row.difficulty}</Typography>
                                        </TableCell>
                                        <TableCell align="center">{row.result ? (<CheckIcon sx={{ color: findColor('green') }} />) : (<ClearIcon sx={{ color: findColor('red') }} />)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid >
            <Popover
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {hoveredImage && (
                    getImage(hoveredImage, 'auto', '37vh')
                )}
            </Popover>
        </Box >
    );
};
