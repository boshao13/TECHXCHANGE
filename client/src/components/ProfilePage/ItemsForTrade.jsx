import React from 'react';
import { Button, Container, Box } from '@mui/material/';
// eslint-disable-next-line import/no-extraneous-dependencies
import AddIcon from '@mui/icons-material/Add';
import ItemEntry from './ItemEntry';
import {styled} from '@mui/system'

const Box1 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'flex-start',
  boxShadow: `-5px -5px 10px #00507a,
  5px 5px 10px #009ef2`,
  borderRadius: '30px',
  marginBottom: '35px',
  paddingBottom: '20px',
  width: '100%',

});
const Box2 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'flex-end',
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'center',


});
const Title = styled('div')({
  textAlign: 'center',
  fontSize: 'larger',
  marginTop:'10px'

})
const AddButton = styled('button')({
  width: '80px',
  height: '25px',
  boxShadow: `7px 7px 14px #005a8a,
  -7px -7px 14px #0094e2`,
  borderRadius: '10px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#505050',
  marginTop: '15px'

})
const buttonSX = {
  "&:hover": {
    boxShadow: `-1px -1px 5px rgba(210,243,255,0.6),
    1px 1px 5px rgba(0,0,0,0.3)`
  },
};


function ItemsForTrade({ changeView, user, itemsData, setAddItem, addItem }) {

  const handleClick = () => {
    console.log('clicked');
    setAddItem(!addItem);
  };
  return (
      <Box1 >
        <Title sx={{color: '#505050',}}>Items for Trade</Title>

        {itemsData.map((item, key) => <ItemEntry changeView={changeView} user={user} item={item} setAddItem={setAddItem} addItem={addItem} key={key} />)
        }

        <Box2>
        <AddButton sx={buttonSX} onClick={handleClick} variant="contained" endIcon={<AddIcon />}>
        Add Item
        </AddButton>
        </Box2>
      </Box1>


  );
}
export default ItemsForTrade;
