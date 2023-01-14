import React from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';

function Profile() {
  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#cfe8fc' }}>
      <div> hello </div>
      <Avatar sx={{ width: '50vw', height: '20vh' }} />
      <div>Hello User</div>
      <div>USER DESCRIPTION</div>

      <Box sx={{ bgcolor: '#ffcc99', height: '20vh' }}>
        Items for Trade
      </Box>
      <PendingTrades />
      <Box sx={{ bgcolor: '#ffcc99', height: '20vh' }}>
        bookmarked items
      </Box>
    </Container>
  );
}

export default Profile;