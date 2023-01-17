import React, { useState } from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';
import ItemsForTrade from './ItemsForTrade';
import AddItem from './AddItem';
import { styled } from '@mui/system'

const PictureContainer = styled('div')({
  backgroundColor: '#CAF0F8',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column' ,
  alignContent:'center',
  flexWrap: 'wrap',
});

const Box1 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  // boxShadow: `-5px -5px 10px rgba(232,242,255,0.8),
  // 5px 5px 10px rgba(0,0,0,0.25)`,
  // borderRadius: '30px;',
  marginBottom: '20px'
});
const avatarSX = {
  marginBottom:'10px',
  boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
  8px 8px 12px rgba(0,0,0,0.25),
  inset -2px -2px 5px rgba(255,255,255,0.6),
  inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '15px',
  width: '200px',
  height: '200px',
  border: '4px solid #CAF0F8',
}

function Profile() {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      {!addItem
          && (
          <PictureContainer >
            <Box1>
              <Avatar sx={avatarSX} />
              <div>Hello User</div>
              <div>USER DESCRIPTION</div>
            </Box1>
            <ItemsForTrade setAddItem={setAddItem} addItem={addItem} />
            <PendingTrades />
            <Box sx={{ bgcolor: '#CAF0F8', height: '20vh' }}>
              bookmarked items
            </Box>
          </PictureContainer>
          )}
      {addItem
          && (
            <AddItem setAddItem={setAddItem} addItem={addItem} />
          )}
    </>
  );
}

export default Profile;
