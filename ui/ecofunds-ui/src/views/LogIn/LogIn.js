/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveWalletAddress } from 'utilities/localStorage';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Container from 'components/Container';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/auth/register', {
        email,
        password,
      });

      if (response.data.success) {
        saveWalletAddress(response.data.result.walletAddress);
        navigate('/', { replace: true });
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Box bgcolor={'alternate.main'}>
      <Container maxWidth={800}>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
            }}
            gutterBottom
            color={'text.secondary'}
            fontWeight={700}
          >
            Login
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            EcoFunds
          </Typography>
        </Box>
        <Card sx={{ p: { xs: 4, md: 6 } }}>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Enter your email
                </Typography>
                <TextField
                  label="Email *"
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  marginBottom={2}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      Enter your password
                    </Typography>
                  </Box>
                  <Typography variant={'subtitle2'}>
                    <Link
                      component={'a'}
                      color={'primary'}
                      href={'#'}
                      underline={'none'}
                    >
                      Forgot your password?
                    </Link>
                  </Typography>
                </Box>
                <TextField
                  label="Password *"
                  variant="outlined"
                  name={'password'}
                  type={'password'}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item container xs={12}>
                <Button
                  size={'large'}
                  variant={'contained'}
                  type={'submit'}
                  fullWidth
                  onClick={handleSubmit}
                >
                  Login / Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default LogIn;
