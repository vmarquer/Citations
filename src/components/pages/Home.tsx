import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { AppContext } from '../contexts/Context';

export const Home = () => {
  const ctx = useContext(AppContext);

  return (
    <Grid item xs={12}>
      <Typography>HOME</Typography>
      {ctx.quotes.length > 0 ? (
        ctx.quotes.map((quote, index) => (
          <Typography key={index}>{quote.quote}</Typography>
        ))
      ) : (
        <Typography>No quotes available.</Typography>
      )}
    </Grid>
  );
};
