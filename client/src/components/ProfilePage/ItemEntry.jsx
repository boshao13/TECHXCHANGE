import React from 'react';
import { Box, Avatar } from '@mui/material/';

const avatarSX = {
  marginBottom:'10px',
  boxShadow: `-5px -5px 10px rgba(232,242,255,0.8),
  5px 5px 10px rgba(0,0,0,0.25)`,
  marginTop: '15px',
  width: '200px',
  height: '200px'
};

function ItemEntry() {
  return (
    <Box sx={{
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      display: 'flex',
      bgcolor: '#CAF0F8',
      height: '10vh',
    }}
    >

      <Box sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
      }}>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, alignContent: 'center', bgcolor: '#3466A3' }}>
        <div> Title</div>
        <div> condition </div>
        <div> description</div>
      </Box>
    </Box>
  );
}
export default ItemEntry;
