import React, { useState } from 'react';
import {
  Button, TextField, Box, Container,
} from '@mui/material/';

function AddItem({ setAddItem, addItem }) {
  const [itemName, setItemName] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const handleClick = () => {
    setAddItem(!addItem);
    console.log(itemName, itemCondition, itemDescription, itemImage);
  };
  return (
    <Container>
      <Button onClick={handleClick} variant="contained">back</Button>
      <Box sx={{ bgcolor: '#ff9966', height: '80vh' }}>
        Add A New Item
        <TextField onChange={(e) => setItemName(e.target.value)} label="Title" value={itemName} variant="filled" />
        <TextField onChange={(e) => setItemCondition(e.target.value)} label="Condition" value={itemCondition} variant="filled" />
        <TextField onChange={(e) => setItemImage(e.target.value)} label="Image" value={itemImage} variant="filled" />
        <TextField onChange={(e) => setItemDescription(e.target.value)} label="Description" value={itemDescription} variant="filled" />
        <Button variant="contained">Submit</Button>
      </Box>
    </Container>
  );
}
export default AddItem;
