import React from 'react';
import { Button, Container, Box } from '@mui/material/';
// eslint-disable-next-line import/no-extraneous-dependencies
import AddIcon from '@mui/icons-material/Add';
import ItemEntry from './ItemEntry';

function ItemsForTrade({ setAddItem, addItem }) {
  const handleClick = () => {
    console.log('clicked');
    setAddItem(!addItem);
  };
  return (

    <Container>
      <Box sx={{ bgcolor: '#ffcc99', height: '25vh' }}>
        Items for Trade
        <Button onClick={handleClick} variant="contained" endIcon={<AddIcon />}>
          Add Item
        </Button>
        <ItemEntry />
      </Box>
    </Container>

  );
}
export default ItemsForTrade;
