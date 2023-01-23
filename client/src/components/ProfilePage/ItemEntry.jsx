import React from 'react';
import { Box, Avatar } from '@mui/material/';
import {styled} from '@mui/system'

const Box1 = styled('div')({
  justifyContent: 'center',
  alignContent: 'center',
  display: 'flex',
  bgcolor: '#0077B6',
  height: '10vh',

  borderRadius: '20px',
  width: '90%'
})
const Box2 = styled('div')({
  flexGrow: 1,
  alignContent: 'center',
  backgroundColor: '#0077B6',
  borderRadius: '20px',
  paddingLeft: '20px',

  paddingTop: '5px',
  background: '#0077B68',
  boxShadow: `inset 6px 6px 6px #006093,
  inset -6px -6px 6px #008ed9`,

  fontSize:'smaller'

})
const TextArea1 = styled('textarea')({
  borderRadius: '5px',
  background: '#0077B6',
  boxShadow: `inset 6px 6px 6px #006093,
  inset -6px -6px 6px #008ed9`,
  border:'none'
})
const avatarSX = {
  marginBottom:'10px',

  boxShadow: `8px 8px 17px #006093,
  -8px -8px 17px #008ed9,

  inset -2px -2px 5px rgba(255,255,255,0.6),
  inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '5px',
  width: '75px',
  height: '75px',
  border: '4px solid #0077B6',
  marginRight: '10px',
  marginLeft: '-8px',

}

function ItemEntry({changeView, user, item}) {
const [itemImage, setItemImage] = useState('')
const [itemName, setItemName] = useState('')
const [itemCondition, setItemCondition] = useState('')
const [itemDescription, setItemDescription] = useState('')
const [itemId, setItemId] = useState('')


const handleClick = () => {
  console.log('ID IS', user.id, itemId)
  changeView('ItemDetails', {currentUserId: user.id, currentItemId: itemId, changeview: changeView})
}

  useEffect(()=>{
    if(user){
      console.log('CURRENT ITEM', itemId, user)
      setItemImage(item.thumbnail_url)
      setItemName(item.name)
      setItemCondition(item.condition)
      setItemDescription(item.description)
      setItemId(item.id)
    }
  },[user])

  return (
    <Box1 onClick={handleClick}>

      <Box sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
      }}>
        <Avatar sx={avatarSX}/>
      </Box>
      <Box2>
        <div> MacBook Pro</div>
        <div>  Condition: Like New </div>
        <div> Description: 5 years old, runs great. </div>
      </Box2>

    </Box1>

  );
}
export default ItemEntry;
