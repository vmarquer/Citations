import { useContext } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AppContext } from "../contexts/Context";
import { findColor } from "../../utils/colors";
import { getDifficultyColor } from "../../utils/difficulty";
import { getFontSize } from "../../utils/fontsizes";
import { Version } from "../../utils/quote";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const HistoryTab = () => {

    const ctx = useContext(AppContext);

    return (
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
                    {ctx.quotes.slice(0, ctx.index).map((quote) => (
                        <TableRow
                            key={quote.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>"{quote.quote[ctx.version as Version]}"</TableCell>
                            <TableCell align="center">{quote.movie[ctx.version as Version]}</TableCell>
                            <TableCell align="center">{quote.userAnswer}</TableCell>
                            <TableCell align="center">
                                <Typography sx={{
                                    fontSize: getFontSize('medium'),
                                    color: findColor('white'),
                                    backgroundColor: findColor(getDifficultyColor(quote.difficulty)),
                                    height: '25px',
                                    width: '25px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>{quote.difficulty}</Typography>
                            </TableCell>
                            <TableCell align="center">{ctx.computeSimilarity(quote.movie[ctx.version as Version], quote.userAnswer) > 0.6 ? (<CheckIcon sx={{ color: findColor('green') }} />) : (<ClearIcon sx={{ color: findColor('red') }} />)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
