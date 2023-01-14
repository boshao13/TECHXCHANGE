import React from 'react';
import { Box, Avatar } from '@mui/material/';

function ItemEntry() {
  return (
    <Box sx={{
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      display: 'flex',
      bgcolor: '#269891',
      height: '10vh',
    }}
    >

      <Box sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
      }}
      >
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, alignContent: 'center', bgcolor: '#112063' }}>
        <div> Title</div>
        <div> condition </div>
        <div> description</div>
      </Box>
    </Box>
  );
}
export default ItemEntry;
