import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { AppContext } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Version } from '../../utils/quote';
import { ClassicButton } from '../common/Classicbutton';
import { PageContainer } from '../common/PageContainer';
import { GamePaper } from '../common/GamePaper';
import { QuestionMode } from '../common/QuestionMode';
import { InputAnswer } from '../common/InputAnswer';
import { AnswerMode } from '../common/AnswerMode';

export const Game = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const [showAnswer, setShowAnswer] = useState<Boolean>(false);
    const [userAnswer, setUserAnswer] = useState('');
    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [showAnswer]);

    const checkAnswer = () => {
        setShowAnswer(true);
        ctx.updateUserAnswer(userAnswer, ctx.currentQuote.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    const nextQuote = () => {
        setShowAnswer(false);
        if (ctx.index === ctx.quotes.length - 1) {
            navigate('/results')
        } else {
            ctx.updateIndex(ctx.index + 1);
            setUserAnswer('');
        }
    }

    return (
        <PageContainer>
            {ctx.currentQuote && ctx.quotes.length > 0 && (
                <GamePaper
                    index={ctx.index}
                    total={ctx.quotes.length}
                    difficulty={ctx.currentQuote.difficulty}
                    difficultyLabel={ctx.getText('difficulty')}
                    historyLabel={ctx.getText('history')}
                    noHistoryLabel={ctx.getText('no_history')}
                >
                    {!showAnswer ? (
                        ctx.currentQuote && (
                            <QuestionMode quote={ctx.currentQuote.quote[ctx.version as Version]} />
                        )
                    ) : (
                        <AnswerMode
                            quote={ctx.currentQuote}
                            version={ctx.version as Version}
                            goodAnswerLabel={ctx.getText('good_answer')}
                            badAnswerLabel={ctx.getText('bad_answer')}
                            answerResultLabel={ctx.getText('answer_result')}
                            result={ctx.computeSimilarity(ctx.currentQuote.movie[ctx.version as Version], userAnswer) > 0.6}
                        />
                    )}
                </GamePaper>
            )}
            {!showAnswer && (
                <Grid item xs={12} pt={1}>
                    <InputAnswer
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        handleKeyDown={handleKeyDown}
                        checkAnswer={checkAnswer}
                        textFieldRef={textFieldRef}
                    />
                </Grid>
            )}
            <Grid item xs={12} pt={2} justifyContent="center" display="flex">
                {showAnswer && (
                    <ClassicButton text={ctx.index + 1 === ctx.quotes.length ? ctx.getText('see_results') : ctx.getText('next_quote')} action={() => nextQuote()} icon={<NavigateNextIcon />} />)}
            </Grid>
        </PageContainer>
    );
};
