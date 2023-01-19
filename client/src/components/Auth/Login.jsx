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
  width: '85%',
  height: '65%',

});
const AddButton = styled('input')({
  width: '80px',
  height: '25px',
  boxShadow: `6px 6px 12px #00507a,
  -6px -6px 12px #009ef2`,
  borderRadius: '10px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#CAF0F8',
  marginTop: '15px',
  marginBottom: '15px'
})
const TextField1 = styled('input')({
  borderRadius: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 5px 5px 6px #a4c2c9,
  inset -5px -5px 6px #f0ffff`,
  border: 'none',
  height: '40px',
  width: '250px',

})
const Box2 = styled('div')({
  alignItems: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  objectFit: 'contain'
});


const Img1 = styled('img')({
height:'250px',
width: '250px',
marginBottom: '20px'
});



export default function Login({ props: { setUser, setRegister } }) {
  const handleSubmit = async event => {
    console.log('CLICKED')
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(data)
    const { data: user } = await axios.post('/users/auth', data);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  };


  return (
    <PictureContainer>
      <Box1>
        <Box2>
      <Img1 src="https://i.ibb.co/SvX3SVN/techxchange-3.png" />
      </Box2>
      <form onSubmit={handleSubmit} style={{ width: '75%' }}>
        <Container maxWidth="sm">
          <TextField1 type="email" label="Email" name="email" required sx={{ width: '100%' }} />
          <hr />
          <TextField1 type="password" label="Password" name="password" required sx={{ width: '100%' }} />
          <hr />
          <Box2>
          <AddButton type="submit" value='Log in'/>
          <Typography
            onClick={() => setRegister(true)}
            sx={{
              color: '#CAF0F8',
              fontSize: '.9rem',
              fontWeight: 'bold',
              ':hover': { cursor: 'pointer' },
            }}>
            Need an account?
          </Typography>
          </Box2>
        </Container>
      </form>
      </Box1>
      </PictureContainer>
  );
}
