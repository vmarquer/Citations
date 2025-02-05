import { Grid, Typography } from '@mui/material';
import { getFontSize } from '../../utils/fontsizes';

interface QuestionModeProps {
    quote: string
}

export const QuestionMode = ({ quote }: QuestionModeProps) => {

    return (
        <Grid item xs={9} sx={{ justifyContent: 'center', display: 'flex', marginRight: 2, marginLeft: 2 }}>
            <Typography sx={{ fontSize: getFontSize('large') }}>
                "{quote}"
            </Typography>
            <Grid />
        </Grid>
    );
};