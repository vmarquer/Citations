import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, Modal, Paper, Typography } from '@mui/material';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { getImage } from '../../utils/image';
import { getDifficultyColor } from '../../utils/difficulty';
import HistoryIcon from '@mui/icons-material/History';
import { HistoryTab } from './HistoryTab';
import { ClassicButton } from './Classicbutton';
import { HistoryModal } from './HistoryModal';

interface GamePaperProps {
    index: number,
    total: number,
    difficulty: string,
    difficultyLabel: string,
    historyLabel: string,
    noHistoryLabel: string,
    children: React.ReactNode;
}

export const GamePaper = ({ index, total, difficulty, difficultyLabel, historyLabel, noHistoryLabel, children }: GamePaperProps) => {

    const [showHistory, setShowhistory] = useState<boolean>(false);

    const handleHistory = () => {
        setShowhistory(!showHistory);
    }

    return (
        <Paper sx={{
            position: 'relative',
            width: '75vw',
            height: '70vh',
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
                <Grid>
                    <ClassicButton action={() => handleHistory()} icon={<HistoryIcon />} />
                </Grid>
                <Modal
                    open={showHistory}
                    onClose={() => setShowhistory(false)}
                >
                    <HistoryModal historyLabel={historyLabel}>
                        {index < 1 ? (<Typography color={findColor('red')}>{noHistoryLabel}</Typography>) : (<HistoryTab />)}
                        
                    </HistoryModal>
                </Modal>
                <Grid sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={(index + 1) * 100 / total}
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
                        >{`${index + 1} / ${total}`}</Typography>
                    </Box>
                </Grid>
                <Grid sx={{
                    color: findColor('white'),
                    backgroundColor: findColor(getDifficultyColor(difficulty)),
                    padding: 2,
                    marginRight: 1,
                    borderRadius: 2,
                    display: 'flex',
                    height: '5vh',
                    alignItems: 'center',
                }}>
                    <Typography sx={{ fontSize: getFontSize('medium') }}>{difficultyLabel}</Typography>
                    <Typography sx={{
                        fontSize: getFontSize('medium'),
                        paddingLeft: 1,
                    }}>{difficulty}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 3,
            }}>
                {children}
            </Grid>
        </Paper>
    );
};
