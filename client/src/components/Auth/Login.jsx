import React from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const PictureContainer = styled('div')({
  backgroundColor: '#0077B6',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column' ,
  alignContent:'center',
  flexWrap: 'wrap',
  height: '110%',
  width: '120%',
  marginLeft: '-10px'
});
const Box1 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  boxShadow: `16px 16px 50px #00507a,
  -16px -16px 50px #009ef2`,
  borderRadius: '30px',
  width: '90%',
  height: '45%'
});
const AddButton = styled('button')({
  width: '80px',
  height: '25px',
  boxShadow: `6px 6px 12px #00507a,
  -6px -6px 12px #009ef2`,
  borderRadius: '10px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#CAF0F8',
  marginTop: '15px'
})

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
    // <Paper
    //   elevation={5}
    //   sx={{
    //     position: 'fixed',
    //     width: '80vw',
    //     height: '60vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly',
    //   }}
    // >
    <PictureContainer>
      <Box1>
      <Typography sx={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 'bold' }}>
        TechXchange
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '75%' }}>
        <Container maxWidth="sm">
          <TextField type="email" label="Email" name="email" required sx={{ width: '100%' }} />
          <hr />
          <TextField type="password" label="Password" name="password" required sx={{ width: '100%' }} />
          <hr />
          <AddButton type="submit" >Log in</AddButton>
          <Typography
            onClick={() => setRegister(true)}
            sx={{
              color: '#CAF0F8',
              fontSize: '.9rem',
              fontWeight: 'bold',
              ':hover': { cursor: 'pointer' },
            }}
          >
            Need an account?
          </Typography>
        </Container>
      </form>
      </Box1>
      </PictureContainer>
  );
}
