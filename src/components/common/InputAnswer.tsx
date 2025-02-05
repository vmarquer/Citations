import { Grid, Paper, TextField } from '@mui/material';
import { findColor } from '../../utils/colors';
import { ClassicButton } from './Classicbutton';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { RefObject } from 'react';

interface InputAnswerProps {
    userAnswer: string,
    setUserAnswer: (value: string) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
    checkAnswer: () => void;
    textFieldRef: RefObject<HTMLInputElement>;
}

export const InputAnswer = ({ userAnswer, setUserAnswer, handleKeyDown, checkAnswer, textFieldRef }: InputAnswerProps) => {
    return (
        <Paper sx={{
            height: '6vh',
            minHeight: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
        }}>
            <Grid container item xs={12} sx={{ justifyContent: 'space-between', display: 'flex', margin: 1 }}>
                <Grid item xs={10.5}>
                    <TextField
                        inputRef={textFieldRef}
                        fullWidth
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Entrez votre réponse ici"
                        onKeyDown={handleKeyDown}
                        sx={{
                            height: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: findColor('black'),
                                },
                                '&:hover fieldset': {
                                    borderColor: findColor('black'),
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: findColor('black'),
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid>
                    <ClassicButton text='' action={checkAnswer} icon={<ArrowCircleRightOutlinedIcon />} />
                </Grid>
            </Grid>
        </Paper>
    );
};