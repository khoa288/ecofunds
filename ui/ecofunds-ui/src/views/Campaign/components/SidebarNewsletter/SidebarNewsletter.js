/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  donate: yup
    .string()
    .trim()
    .email('Donate Amount')
    .required('Donate is required.'),
});

const SidebarNewsletter = () => {
  const initialValues = {
    donate: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box
      component={Card}
      variant={'outlined'}
      padding={2}
      bgcolor={'transparent'}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            Contribute this campaign
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Enter The Donation
                </Typography>
                <TextField
                  label="0.1 SOL *"
                  variant="outlined"
                  name={'donate'}
                  fullWidth
                  value={formik.values.donate}
                  onChange={formik.handleChange}
                  error={formik.touched.donate && Boolean(formik.errors.donate)}
                  helperText={formik.touched.donate && formik.errors.donate}
                />
              </Grid>
              <Grid item container xs={12}>
                <Button
                  size={'large'}
                  variant={'contained'}
                  fullWidth
                  type={'submit'}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SidebarNewsletter;
