import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { useTheme } from '@mui/material/styles';
import { Avatar, Card } from '@mui/material';

const mock = [
  {
    number: '1000+',
    title: 'SOL',
    subtitle: 'Donations Amount for the Campaign',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
        />
      </svg>
    ),
  },
  {
    number: '2+',
    title: 'Solar Panels',
    subtitle: 'Amount of Solar Panels have been installed',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

const validationSchema = yup.object({
  Wallet: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid Wallet')
    .max(50, 'Please enter a valid Wallet')
    .required('Please specify your Wallet'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  walletaddress: yup.string().trim().max(500, 'Should be less than 500 chars'),
  phonenumber: yup
    .number()
    .min(2, 'Please enter a valid phone number')
    .max(200, 'Please enter a valid phone number'),
});

const General = () => {
  const initialValues = {
    fullName: '',
    bio: '',
    email: '',
    country: '',
    city: '',
    address: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  const theme = useTheme();

  return (
    <Main>
      <Page>
        <Box>
          <Grid container spacing={4}>
            {mock.map((item, i) => (
              <Grid item xs={12} sm={6} md={6} key={i}>
                <Box
                  component={Card}
                  padding={4}
                  borderRadius={2}
                  width={1}
                  height={1}
                  data-aos={'fade-up'}
                  data-aos-delay={i * 100}
                  data-aos-offset={100}
                  data-aos-duration={600}
                  variant={'outlined'}
                >
                  <Box display={'flex'} flexDirection={'column'}>
                    <Box
                      component={Avatar}
                      width={50}
                      height={50}
                      marginBottom={2}
                      bgcolor={theme.palette.primary.main}
                      color={theme.palette.background.paper}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant={'h4'}
                      color={'primary'}
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {item.number}
                    </Typography>
                    <Typography
                      variant={'h6'}
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Wallet name
                </Typography>
                <TextField
                  label="Wallet *"
                  variant="outlined"
                  name={'fullName'}
                  fullWidth
                  value={formik.values.Wallet}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.Wallet)
                  }
                  helperText={formik.touched.fullName && formik.errors.Wallet}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Email
                </Typography>
                <TextField
                  label="Email *"
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Wallet Address
                </Typography>
                <TextField
                  label="Wallet Address"
                  variant="outlined"
                  name={'wallet address'}
                  fullWidth
                  value={formik.values.walletaddress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.bio && Boolean(formik.errors.walletaddress)
                  }
                  helperText={formik.touched.bio && formik.errors.walleraddress}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Phone Number
                </Typography>
                <TextField
                  label="Phone number *"
                  variant="outlined"
                  name={'address'}
                  fullWidth
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.phonenumber)
                  }
                  helperText={
                    formik.touched.address && formik.errors.phonenumber
                  }
                />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </Main>
  );
};

export default General;
