import { Box, Grid } from '@mui/material';

interface PageContainerProps {
    children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
    return (
        <Box sx={{
            color: 'black',
            background: 'linear-gradient(135deg, #A1C6EA, #F7A9A8, #F4D06F, #B7E4C7, #C3AED6)',
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Box>
    );
};