import React from 'react';
import { Grid, Card, Typography, CardContent, Box } from '@mui/material';

export const Home = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* 左側卡片區域 */}
        <Grid item xs={8}>
          {[1, 2, 3].map((_, index) => (
            <Card key={index} sx={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Title
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Description
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  at turpis egestas, posuere massa sit amet, commodo velit.
                  Donec condimentum euismod sem a porta.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* 右側用戶與新聞區 */}
        <Grid item xs={4}>
          <Card sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">User124</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                10 Sept 2024
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
                turpis egestas, posuere massa sit amet, commodo velit. Donec
                condimentum euismod sem a porta.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">News</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
                turpis egestas, posuere massa sit amet, commodo velit. Donec
                condimentum euismod sem a porta.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
