import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, SelectChangeEvent, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { Version } from '../../utils/quote';
import { Quiz } from '../../utils/quiz';
import { EnumSelector } from '../common/EnumSelector';
import { ClassicButton } from '../common/Classicbutton';
import { PageContainer } from '../common/PageContainer';

export const Home = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const handleVersion = (event: SelectChangeEvent) => {
        ctx.updateVersion(event.target.value as Version);
    };

    const handleQuizType = (event: SelectChangeEvent) => {
        ctx.updateQuizType(event.target.value as Quiz);
    };

    const startGame = () => {
        ctx.launchQuiz();
        navigate('/game');
    }

    return (
        <PageContainer>
            <Paper sx={{
                width: '40vw',
                minWidth: '350px',
                height: '30vh',
                minHeight: '200px',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Typography sx={{ marginBottom: 2, fontSize: getFontSize('title'), fontWeight: 'bold' }}>{ctx.getText('app_title')}</Typography>
                <Grid item xs={12} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <EnumSelector images={true} value={ctx.quizType} values={Quiz} onChange={handleQuizType} />
                    <EnumSelector images={true} value={ctx.version} values={Version} onChange={handleVersion} />
                    <ClassicButton text={ctx.getText('start')} action={() => startGame()} icon={<PlayCircleOutlineIcon />} />
                </Grid>
            </Paper>
        </PageContainer>
    );
};
