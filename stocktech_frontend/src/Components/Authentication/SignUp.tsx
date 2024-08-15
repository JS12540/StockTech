import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BG_IMG } from '../../constants';
import Copyright from '../UtilityComponents/Copyright';
import { signUp } from '../../API';
import utility from '../../Utility';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

interface ISignUpForm {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  passwordConfirm: FormDataEntryValue | null;
}

/**
 * Handles the form submission event.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
export default function SignUp() {

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData: ISignUpForm = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm')
    }

    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      alert('Please fill in all the required fields.');
      return; // Prevent further execution
    }

    if (!utility.validateName(formData.name)) {
      alert('Invalid name format.');
      return; // Prevent further execution
    }

    if (!utility.validateEmail(formData.email)) {
      alert('Invalid email format.');
      return; // Prevent further execution
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('Passwords do not match.');
      return; // Prevent further execution
    }

    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });

    signUp(formData)
      .then((data) => {
        navigate('/stock/2023/INE406F01010');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BG_IMG})`,
            backgroundRepeat: 'no-repeat',
            /**
             * Returns the background color based on the current palette mode.
             *
             * @param {object} t - The theme object.
             * @return {string} The background color.
             */
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="dense"
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
              <TextField
                margin="dense"
                autoComplete="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                margin="dense"
                autoComplete="new-password"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="dense"
                autoComplete="new-password"
                required
                fullWidth
                name="passwordConfirm"
                label=" Confirm Password"
                type="password"
                id="passwordConfirm"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
