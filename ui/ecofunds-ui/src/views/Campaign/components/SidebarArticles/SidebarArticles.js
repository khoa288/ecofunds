/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const mock = [
  {
    description: 'SOL Raised',
    title: '10',
  },
  {
    description: 'SOL/cNFT',
    title: '0.1',
  },
  {
    description: 'NFTs Left',
    title: '100',
  },
];

const SidebarArticles = () => {
  return (
    <Box component={Card} variant={'outlined'} padding={2}>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid key={i} item xs={12}>
            <CardContent>
              <Typography variant={'h5'} color={'#177300'}>
                <b>{item.title}</b>
              </Typography>
              <Box marginY={1 / 4}>
                <Typography
                  variant={'caption'}
                  color={'text.primary'}
                  component={'i'}
                >
                  {item.description}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SidebarArticles;
