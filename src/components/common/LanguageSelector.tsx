import React, { useContext } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { findColor } from '../../utils/colors';
import { AppContext } from '../contexts/Context';
import { Language } from '../../utils/language';
import { EnumSelector } from './EnumSelector';

export const LanguageSelector = () => {

    const ctx = useContext(AppContext);

    const handleChange = (event: SelectChangeEvent) => {
        ctx.updateLanguage(event.target.value as Language);
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 30,
            left: 30,
            color: findColor('black'),
            borderRadius: 1,
            zIndex: 1000,
        }}>
            <EnumSelector images={true} value={ctx.language} values={Language} onChange={handleChange} iconSize='medium' />
        </Box>
    );
};
