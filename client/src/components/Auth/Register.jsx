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
  flexDirection: 'row-reverse' ,
  alignItems:'center',
  flexWrap: 'wrap',
  height: '110%',
  width: '120%',
  marginLeft: '-10px'
});
const TextField1 = styled('input')({
  borderRadius: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 5px 5px 6px #a4c2c9,
  inset -5px -5px 6px #f0ffff`,
  border: 'none',
  height: '40px',
  width: '100%',
  marginBottom: '10px'

})
const Img1 = styled('img')({
  width:'90%'

  });
  const Box1 = styled('div')({
    backgroundColor: '#0077B6',
    alignItems: 'center',
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
  const Box2 = styled('div')({
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  });

export default function Register({ props: { setUser, setRegister } }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.name.value,
      description: event.target.description.value,
      street: event.target.street.value,
      city: event.target.city.value,
      state: event.target.state.value,
    };

    const GOOGLE_MAPS_KEY = 'AIzaSyAioaBzcUMBv_L3lsd9CoFbz4Gw-Xv-IhY';
    const address = `${data.street} ${data.city} ${data.state} &key=${GOOGLE_MAPS_KEY}`;
    const {
      geometry: {
        location: { lat, lng },
      },
    } = (
      await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
      )
    ).data.results[0];
    data.latitude = lat;
    data.longitude = lng;
    const { data: user } = await axios.post('/users', data);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  };


  return (
<PictureContainer>


    <Box1 >
    <Img1 src="https://i.ibb.co/5MmX0k1/techxchange-500-150-px-350-150-px-350-100-px.png" />
    <Box2>
      <form onSubmit={handleSubmit} style={{ width: '100%', alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',}}>

          <TextField1
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            required

          />

          <TextField1
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
            required

          />

          <TextField1
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            required

          />

          <TextField1
            type="text"
            label="Description"
            name="description"
            placeholder="Description"

          />

          <TextField1
            type="text"
            label="Street"
            name="street"
            placeholder="Street"
            required

          />

          <TextField1
            type="text"
            label="City"
            name="city"
            placeholder="City"
            required

          />

          <TextField1

            type="text"
            label="State"
            name="state"
            placeholder="State"
            required

          />

          <Button type="submit" variant="contained" sx={{ width: '100%' }}>
            Register
          </Button>
          <Typography
            onClick={() => setRegister(false)}
            sx={{
              color: '#CAF0F8',
              fontSize: '.9rem',
              fontWeight: 'bold',
              ':hover': { cursor: 'pointer' },
            }}
          >
            Already have an account?
          </Typography>
          </form>
          </Box2>
        </Box1>

      </PictureContainer>
  );
}
