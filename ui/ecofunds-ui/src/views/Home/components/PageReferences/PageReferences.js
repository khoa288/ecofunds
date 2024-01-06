import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import image1 from './svg/1.jpg';
import image2 from './svg/2.jpg';
import image3 from './svg/3.jpg';
import image4 from './svg/4.jpg';
import image5 from './svg/5.jpg';
const PageReferences = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: image4,
      rows: 2,
      cols: 1,
    },
    {
      src: image3,
      rows: 1,
      cols: 2,
    },
    {
      src: image2,
      rows: 1,
      cols: 1,
    },
    {
      src: image1,
      rows: 1,
      cols: 1,
    },
    {
      src: image5,
      rows: 1,
      cols: 2,
    },
  ];

  const photosToShow = isMd ? photos : photos.slice(0, photos.length - 1);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
          gutterBottom
          color={'text.secondary'}
          align={'center'}
        >
          Impact
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          By You
        </Typography>
        <Typography variant="h6" align={'center'} color={'text.secondary'}>
          With your donation, it could help impact millions of lives that are
          struggling with light.
        </Typography>
      </Box>
      <Box>
        <ImageList
          variant="quilted"
          cols={4}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photosToShow.map((item, i) => (
            <ImageListItem
              key={i}
              cols={isMd ? item.cols || 1 : 2}
              rows={isMd ? item.rows || 1 : 1}
            >
              <img
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                  cursor: 'poiner',
                  borderRadius: 8,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default PageReferences;
