import React from 'react';
import { Button, Container, Box } from '@mui/material/';
import  AddIcon  from '@mui/icons-material/Add';

function ItemsForTrade() {
  return (
    <Container>
      <Box sx={{ bgcolor: '#ffcc99', height: '25vh' }}>
        Items for Trade
        <Button variant="contained" endIcon={<AddIcon />}>
          Add Item
        </Button>
      </Box>

    </Container>
  );
}
export default ItemsForTrade;
