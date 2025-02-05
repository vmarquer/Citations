import React, { useContext } from 'react';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';
import { getIconStyle } from '../../utils/icons';

interface EnumSelectorProps<T extends Record<string, string>> {
    images?: boolean
    value: string
    values: T
    iconSize: string
    onChange: (event: SelectChangeEvent) => void
}

export const EnumSelector = <T extends Record<string, string>>({
    images = false,
    value,
    values,
    iconSize,
    onChange,
}: EnumSelectorProps<T>) => {

    const ctx = useContext(AppContext);

    return (
        <Select
            value={value}
            sx={{
                borderRadius: "10%",
                lineHeight: "0px",
                backgroundColor: "white",
            }}
            onChange={onChange}
        >
            {Object.values(values).map((val) => (
                <MenuItem key={val} value={val}>
                    {images ?
                        (<img src={`${process.env.PUBLIC_URL}/${val}.svg`} alt={val} style={getIconStyle(iconSize)} />) :
                        (<Typography sx={{ paddingRight: 1 }}>{ctx.getText(val)}</Typography>)
                    }
                </MenuItem>
            ))}
        </Select>
    );
};
