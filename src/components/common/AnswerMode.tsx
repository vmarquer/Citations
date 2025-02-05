import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { getFontSize } from '../../utils/fontsizes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ReactAudioPlayer from 'react-audio-player';
import { findColor } from '../../utils/colors';
import { getImage } from '../../utils/image';
import { Quote, Version } from '../../utils/quote';

interface AnswerModeProps {
    quote: Quote
    version: Version
    movieLabel: string
    caracterLabel: string
    actorLabel: string
    userGuessLabel: string,
    result: boolean,
}

export const AnswerMode = ({ quote, version, movieLabel, caracterLabel, actorLabel, userGuessLabel, result }: AnswerModeProps) => {

    return (
        <Grid item xs={9} sx={{ justifyContent: 'center', display: 'flex', marginRight: 2, marginLeft: 2 }}>
            <Grid item xs={12} sx={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                <Grid item xs={4} sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    overflowY: 'auto',
                    maxHeight: '50vh',
                }}>
                    {getImage(quote.image, 'auto', '44vh')}
                    <ReactAudioPlayer
                        src={`audio/${version}/2.mp3`}
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
                    <Typography sx={{ fontSize: getFontSize('large') }}>"{quote.quote[version]}"</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableBody>
                                <TableRow
                                    key="movie"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{movieLabel}</TableCell>
                                    <TableCell align="center">{quote.movie[version]}</TableCell>
                                </TableRow>
                                <TableRow
                                    key="character"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{caracterLabel}</TableCell>
                                    <TableCell align="center">{quote.caracter || ''}</TableCell>
                                </TableRow>
                                <TableRow
                                    key="actor"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{actorLabel}</TableCell>
                                    <TableCell align="center">{quote.actor || ''}</TableCell>
                                </TableRow>
                                <TableRow
                                    key="guess"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{userGuessLabel}</TableCell>
                                    <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                        {quote.userAnswer || ''}
                                        {result ? (
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
        </Grid>
    );
};