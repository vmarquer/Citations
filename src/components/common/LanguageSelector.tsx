import React, { useContext } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { findColor } from '../../utils/colors';
import { AppContext } from '../contexts/Context';
import { Language } from '../../utils/language';
import { EnumSelector } from './EnumSelector';

export const LanguageSelector = () => {

    const ctx = useContext(AppContext);
    const imageStyle = { width: '3vh', height: '3vh' };

    const handleChange = (event: SelectChangeEvent) => {
        ctx.updateLanguage(event.target.value as Language);
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 30,
            right: 30,
            color: findColor('black'),
            borderRadius: 1,
            zIndex: 1000,
        }}>
            <EnumSelector images={true} value={ctx.language} values={Language} onChange={handleChange} />
        </Box>
    );
};
