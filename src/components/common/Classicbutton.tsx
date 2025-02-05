import { Button, Typography } from "@mui/material";
import { findColor } from "../../utils/colors";
import { ReactNode } from "react";

interface ClassicButtonProps {
    text?: string;
    action: () => void;
    icon: ReactNode;
}

export const ClassicButton = ({ text, action, icon }: ClassicButtonProps) => {

    return (
        <Button sx={{
            color: findColor('black'),
            display: "flex",
            backgroundColor: findColor('white'),
            height: "100%",
            justifyContent: "center",
            border: `1px solid ${findColor('black')}`,
            '&:hover': {
                backgroundColor: findColor('white'),
            }
        }}
            onClick={() => action()}>
            {text && (<Typography sx={{ paddingRight: 1 }}>{text}</Typography>)}
            {icon}
        </Button>
    );
};
