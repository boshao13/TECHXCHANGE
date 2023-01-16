import React, { useState } from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';
import ItemsForTrade from './ItemsForTrade';
import AddItem from './AddItem';

function Profile() {
  const [addItem, setAddItem] = useState(false);

  return (
    <>
      {!addItem
          && (
          <Container sx={{ width: '100vw', height: '100vh', bgcolor: '#CAF0F8' }}>
            <Box sx={{ alignContent: 'center', flexWrap: 'wrap', display: 'flex', flexDirection: 'column' ,justifyContent: 'center', bgcolor: '#ff9966' }}>
              <Avatar sx={{ width: '50vw', height: '20vh' }} />
              <div>Hello User</div>
              <div>USER DESCRIPTION</div>
            </Box>
            <ItemsForTrade setAddItem={setAddItem} addItem={addItem} />
            <PendingTrades />
            <Box sx={{ bgcolor: '#ffcc99', height: '20vh' }}>
              bookmarked items
            </Box>
          </Container>
          )}
      {addItem
          && (
            <AddItem setAddItem={setAddItem} addItem={addItem} />
          )}
    </>
  );
}

export default Profile;
