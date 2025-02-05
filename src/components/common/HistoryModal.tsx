import { useContext } from "react";
import { Paper, Typography } from "@mui/material";
import { AppContext } from "../contexts/Context";
import { getFontSize } from "../../utils/fontsizes";

interface HistoryModalProps {
    historyLabel: string
    children: React.ReactNode;
}

export const HistoryModal = ({ historyLabel, children }: HistoryModalProps) => {

    const ctx = useContext(AppContext);

    return (
        <Paper sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '60vw',
            minWidth: '350px',
            maxHeight: '70vh',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Typography sx={{ fontSize: getFontSize('large') }}>{historyLabel}</Typography>
            {children}
        </Paper>
    );
};
