import React, { useContext } from 'react';
import { Paper, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { getFontSize } from '../../utils/fontsizes';
import { PageContainer } from '../common/PageContainer';
import { HistoryTab } from '../common/HistoryTab';

export const Results = () => {

    const ctx = useContext(AppContext);

    return (
        <PageContainer>
            <Paper sx={{
                width: '70vw',
                minWidth: '350px',
                height: '80vh',
                minHeight: '200px',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Typography sx={{ fontSize: getFontSize('large') }}>{ctx.getText('history')}</Typography>
                <HistoryTab></HistoryTab>
            </Paper>
        </PageContainer>
    );
};
