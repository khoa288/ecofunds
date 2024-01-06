/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from '../Hero/svg/1.jpg';
const Content = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box paddingX={{ xs: 0, sm: 4, md: 6 }}>
        <Typography variant={'subtitle1'}>
          Muong Lat is a border district located at the northwest end of Thanh
          Hoa province, the most remote and poorest district in this province.
          In particular, in some villages bordering the Vietnam-Laos border in
          the district, the lives of people of the Mong, Dao, Thai, Muong...
          ethnic groups are still very difficult because there is no electricity
          grid. With the goal of providing a clean light source to create
          sustainable values and light up the future for poor children in remote
          areas, we, EcoFund, launched a community project to Muong Lat and to
          Pu Duc school. , Quang Chieu 1 Primary School (Quang Chieu commune,
          Muong Lat district) and Sai Khao School, Tay Tien Primary School
          (Muong Ly commune, Muong Lat district) to install solar power systems
          for the schools.
        </Typography>
        <Box width={1} height={1} marginY={4}>
          <img
            height={'100%'}
            width={'100%'}
            src={Image}
            alt="Remote working"
            loading="lazy"
            style={{
              filter:
                theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              objectFit: 'cover',
              borderRadius: 8,
              width: '100%',
              height: '100%',
              maxHeight: 400,
            }}
          />
        </Box>
      </Box>
      <Box
        component={Card}
        boxShadow={2}
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row-reverse' }}
        sx={{ backgroundImage: 'none' }}
      >
        <CardContent
          sx={{
            position: 'relative',
            width: { xs: 1, md: '100%' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography color={'text.secondary'}>Collection Address</Typography>
        </CardContent>
      </Box>
      <Box paddingY={4}>
        <Divider />
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box>
            <Typography fontWeight={600}>Author</Typography>
            <Typography color={'text.secondary'}>May 19, 2021</Typography>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography color={'text.secondary'}>Share:</Typography>
          <Box marginLeft={0.5}>
            <IconButton aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
