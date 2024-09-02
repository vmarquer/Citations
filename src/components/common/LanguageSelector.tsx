import React, { useContext } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { findColor } from '../../utils/colors';
import { AppContext } from '../contexts/Context';

export const LanguageSelector = () => {

    const ctx = useContext(AppContext);
    const imageStyle = { width: '30px', height: '30px' };

    const handleChange = (event: SelectChangeEvent) => {
        ctx.updateLanguage(event.target.value as string);
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
                    borderRadius: '0px',
                    lineHeight: '0px',
                    backgroundColor: findColor('white'),
                }}
                onChange={handleChange}
            >
                <MenuItem value="vf"><img src={`${process.env.PUBLIC_URL}/vf.svg`} alt="vf" style={imageStyle} /></MenuItem>
                <MenuItem value="vo"><img src={`${process.env.PUBLIC_URL}/vo.svg`} alt="vo" style={imageStyle} /></MenuItem>
            </Select>
        </Box>
    );
};
