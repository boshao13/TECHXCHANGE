import React from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login({ props: { setUser, setRegister } }) {
  const handleSubmit = async event => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const { data: user } = await axios.post('/users/auth', data);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        position: 'fixed',
        width: '80vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Typography sx={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 'bold' }}>
        TechXchange
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '75%' }}>
        <Container maxWidth="sm">
          <TextField type="email" label="Email" name="email" required sx={{ width: '100%' }} />
          <hr />
          <TextField type="password" label="Password" name="password" required sx={{ width: '100%' }} />
          <hr />
          <Button type="submit" variant="contained" sx={{ width: '100%' }}>Log in</Button>
          <Typography
            onClick={() => setRegister(true)}
            sx={{
              color: '#0077B6',
              fontSize: '.9rem',
              fontWeight: 'bold',
              ':hover': { cursor: 'pointer' },
            }}
          >
            Need an account?
          </Typography>
        </Container>
      </form>
    </Paper>
  );
}
