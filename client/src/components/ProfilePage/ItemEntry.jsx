import React, {useEffect, useState} from 'react';
import { Box, Avatar } from '@mui/material/';
import {styled} from '@mui/system'

const Box1 = styled('div')({
  justifyContent: 'center',
  alignContent: 'center',
  display: 'flex',
  bgcolor: '#CAF0F8',
  height: '10vh',
  borderRadius: '20px',
  width: '90%',
  marginTop: '10px'
})
const Box2 = styled('div')({
  flexGrow: 1,
  alignContent: 'center',
  backgroundColor: '#00B4D8',
  borderRadius: '20px',
  paddingLeft: '20px',
  paddingTop: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 2px 2px 3px #a4c2c9,
  inset -2px -2px 3px #f0ffff`,
  fontSize:'smaller'

})
const TextArea1 = styled('textarea')({
  borderRadius: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 5px 5px 6px #a4c2c9,
  inset -5px -5px 6px #f0ffff`,
  border:'none'
})
const avatarSX = {
  marginBottom:'10px',
  // boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
  // 8px 8px 12px rgba(0,0,0,0.25),
  // inset -2px -2px 5px rgba(255,255,255,0.6),
  // inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '5px',
  width: '75px',
  height: '75px',
  // border: '4px solid #CAF0F8',
  marginRight: '10px',
  marginLeft: '-8px',
  // borderRadius: '10px'
}

function ItemEntry({user, item}) {
const [itemImage, setItemImage] = useState('')
const [itemName, setItemName] = useState('')
const [itemCondition, setItemCondition] = useState('')
const [itemDescription, setItemDescription] = useState('')

  useEffect(()=>{
    if(user){
      console.log('CURRENT ITEM', item)
      setItemImage(item.thumbnail_url)
      setItemName(item.name)
      setItemCondition(item.condition)
      setItemDescription(item.description)
    }
  },[user])

  return (
    <Box1>
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
      }}>
        <Avatar src={itemImage} sx={avatarSX}/>
      </Box>
      <Box2>
        <div> {itemName}</div>
        <div>  Condition: {itemCondition}</div>
        <div> Description: {itemDescription} </div>
      </Box2>

    </Box1>

  );
}
export default ItemEntry;
