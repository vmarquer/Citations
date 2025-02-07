import { Grid, Paper, Typography } from '@mui/material';
import { getFontSize } from '../../utils/fontsizes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ReactAudioPlayer from 'react-audio-player';
import { findColor } from '../../utils/colors';
import { getImage } from '../../utils/image';
import { Quote, Version } from '../../utils/quote';

interface AnswerModeProps {
    quote: Quote
    version: Version
    goodAnswerLabel: string
    badAnswerLabel: string
    answerResultLabel: string
    result: boolean
}

export const AnswerMode = ({ quote, version, goodAnswerLabel, badAnswerLabel, answerResultLabel, result }: AnswerModeProps) => {

    return (
        <Grid item xs={12} sx={{ justifyContent: 'space-between', display: 'flex', marginRight: 2, marginLeft: 2 }}>
            <Paper sx={{
                width: '20%',
                minWidth: '100px',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: findColor("background")
            }}>
                {getImage(quote.image, '95%', '95%')}
                <ReactAudioPlayer
                    src={`audio/${version}/2.mp3`}
                    controls
                    style={{
                        marginTop: '5px',
                        width: '95%'
                    }}
                />
            </Paper>
            <Paper sx={{
                width: '72%',
                minWidth: '300px',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                backgroundColor: findColor("background")
            }}>
                <Grid xs={11} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: getFontSize('large') }}>"{quote.quote[version]}"</Typography>
                </Grid>
                {result ? (
                    <Grid sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <CheckCircleIcon sx={{ color: findColor('green'), fontSize: getFontSize('big_icon') }} />
                        <Typography sx={{ fontSize: getFontSize('large'), color: findColor('green') }}>{goodAnswerLabel}</Typography>
                    </Grid>

                ) : (
                    <Grid sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <CancelRoundedIcon sx={{ color: findColor('red'), fontSize: getFontSize('big_icon') }} />
                        <Typography sx={{ fontSize: getFontSize('large'), color: findColor('red') }}>{badAnswerLabel}</Typography>
                    </Grid>
                )}
                <Grid>
                    <Typography sx={{ fontSize: getFontSize('medium') }}>{answerResultLabel} {quote.movie[version]}</Typography>
                    <Typography sx={{ fontSize: getFontSize('medium') }}>{quote.caracter} - {quote.actor}</Typography>
                </Grid>
            </Paper>
        </Grid>
    );
};