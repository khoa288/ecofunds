/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FirstImage from './svg/3.png';
import SecondImage from './svg/1.png';

const mock = [
  {
    image: FirstImage,
    description:
      'Dien Bien is the province with the lowest proportion of people using national grid electricity in the country',
    title: '92,5%',
    tags: ['Statistic'],
    date: 'baodienbienphu.com.vn',
  },
  {
    image: SecondImage,
    description:
      'Thousands of rural households do not yet use electricity from the national grid, people use flashlights and lighting oil for daily activities',
    title: 'Vietnam',
    tags: ['Statistic'],
  },
];

const PopularNews = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid key={i} item xs={12}>
            <Box
              component={Card}
              width={1}
              height={1}
              borderRadius={0}
              boxShadow={0}
              display={'flex'}
              flexDirection={{
                xs: 'column',
                md: i % 2 === 0 ? 'row-reverse' : 'row',
              }}
              sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
            >
              <Box
                sx={{
                  width: { xs: 1, md: '50%' },
                }}
              >
                <Box
                  component={'img'}
                  loading="lazy"
                  height={1}
                  width={1}
                  src={item.image}
                  alt="..."
                  sx={{
                    objectFit: 'cover',
                    maxHeight: 360,
                    borderRadius: 2,
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  paddingX: { xs: 1, sm: 2, md: 4 },
                  paddingY: { xs: 2, sm: 4 },
                  width: { xs: 1, md: '50%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  {item.tags.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      component="a"
                      href=""
                      clickable
                      size={'small'}
                      color={theme.primary}
                      sx={{ marginBottom: 1, marginRight: 1 }}
                    />
                  ))}
                </Box>
                <Typography
                  variant={'h3'}
                  color={'#106900'}
                  fontWeight={700}
                  sx={{ textTransform: 'uppercase' }}
                >
                  {item.title}
                </Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularNews;
