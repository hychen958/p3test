import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

export const Home = () => {
  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {/* 左邊內容區塊 */}
      <Grid item xs={8}>
        {[...Array(3)].map((_, index) => (
          <Card key={index} sx={{ padding: '20px', marginBottom: '10px' }}>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body2" color="text.secondary">
              Description
            </Typography>
            <Typography sx={{ marginTop: '10px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
              turpis egestas, posuere massa sit amet, commodo velit.
            </Typography>
          </Card>
        ))}
      </Grid>

      {/* 右邊資訊區 */}
      <Grid item xs={4}>
        <Card sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">User124</Typography>
          <Typography variant="body2" color="text.secondary">
            10 Sept 2024
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            turpis egestas, posuere massa sit amet, commodo velit.
          </Typography>
        </Card>
        <Card sx={{ padding: '20px' }}>
          <Typography variant="h6">News</Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            turpis egestas, posuere massa sit amet, commodo velit.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};
