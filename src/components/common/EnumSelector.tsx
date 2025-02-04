import React, { useContext } from 'react';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';

interface EnumSelectorProps<T extends Record<string, string>> {
    images?: boolean,
    value: string;
    values: T;
    onChange: (event: SelectChangeEvent) => void;
}
export const EnumSelector = <T extends Record<string, string>>({
    images = false,
    value,
    values,
    onChange,
}: EnumSelectorProps<T>) => {

    const ctx = useContext(AppContext);
    const imageStyle = { width: "40px", height: "40px" };

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
                        (<img src={`${process.env.PUBLIC_URL}/${val}.svg`} alt={val} style={imageStyle} />) :
                        (<Typography sx={{ paddingRight: 1 }}>{ctx.getText(val)}</Typography>)
                    }
                </MenuItem>
            ))}
        </Select>
    );
};
