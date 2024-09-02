import React, { useContext } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { findColor } from '../../utils/colors';
import { AppContext } from '../contexts/Context';
import { Language } from '../../utils/language';

export const LanguageSelector = () => {

    const ctx = useContext(AppContext);
    const imageStyle = { width: '30px', height: '30px' };

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
            <Select
                value={ctx.language}
                sx={{
                    borderRadius: '20%',
                    lineHeight: '0px',
                    backgroundColor: findColor('white'),
                }}
                onChange={handleChange}
            >
                {Object.values(Language).map((language) => (
                    <MenuItem key={language} value={language}><img src={`${process.env.PUBLIC_URL}/${language}.svg`} alt={language} style={imageStyle} /></MenuItem>
                ))}
            </Select>
        </Box>
    );
};
