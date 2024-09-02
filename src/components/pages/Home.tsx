import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { findColor } from '../../utils/colors';
import { getFontSize } from '../../utils/fontsizes';
import { useNavigate } from 'react-router-dom';
import { texts } from '../../utils/language';
import { Version } from '../../utils/quote';

export const Home = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const [quotesNumber, setQuotesNumber] = useState<number>(10)
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const imageStyle = { width: '30px', height: '30px' };

    const handleVersion = (event: SelectChangeEvent) => {
        ctx.updateVersion(event.target.value as Version);
    };

    const startGame = () => {
        if (quotesNumber > ctx.allQuotes.length) {
            setOpenDialog(true);
        } else {
            ctx.startGame(quotesNumber);
            navigate('/game');
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{
            color: findColor('black'),
            background: 'linear-gradient(135deg, #A1C6EA, #F7A9A8, #F4D06F, #B7E4C7, #C3AED6)',
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Grid item xs={12}>
                <Paper sx={{
                    width: '40vw',
                    height: '30vh',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ marginBottom: 2, fontSize: getFontSize('title'), fontWeight: 'bold' }}>{ctx.getText('app_title')}</Typography>
                    <Grid item xs={12} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField
                            type="number"
                            value={quotesNumber}
                            onChange={(e) => setQuotesNumber(Number(e.target.value))}
                            placeholder={String(quotesNumber)}
                        />
                        <Select
                            value={ctx.version}
                            sx={{
                                borderRadius: 2,
                                marginLeft: 2,
                                lineHeight: '0px',
                                backgroundColor: findColor('white'),
                            }}
                            onChange={handleVersion}
                        >
                            {Object.values(Version).map((version) => (
                                <MenuItem key={version} value={version}><img src={`${process.env.PUBLIC_URL}/${version}.svg`} alt={version} style={imageStyle} /></MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`,
                        '&:hover': {
                            backgroundColor: findColor('white'),
                        }
                    }}
                        onClick={() => startGame()}>
                        <Typography sx={{ paddingRight: 1 }}>{ctx.getText('start')}</Typography>
                        <PlayCircleOutlineIcon />
                    </Button>
                </Paper>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{ctx.getText('error')}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontSize: getFontSize('small')}}>{ctx.getText('error_message')}{ctx.allQuotes.length} !</Typography>
                </DialogContent>
                <DialogActions>
                <Button sx={{
                        color: findColor('black'),
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${findColor('black')}`,
                        '&:hover': {
                            backgroundColor: findColor('white'),
                        }
                    }}
                        onClick={handleCloseDialog}>
                        <Typography sx={{ fontSize: getFontSize('small')}}>{ctx.getText('ok')}</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
