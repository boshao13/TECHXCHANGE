import React, { useState, useEffect } from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';
import ItemsForTrade from './ItemsForTrade';
import BookmarkedItems from './BookmarkedItems'
import AddItem from './AddItem';
import { styled } from '@mui/system';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

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

  marginBottom: '20px'
});
const Box2 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  textAlign: 'center',
  color: '#505050',

});
const avatarSX = {
  marginBottom:'10px',
  boxShadow: `-10px -10px 14px rgba(232,242,255,0.8),
  10px 10px 14px rgba(0,0,0,0.3),
  inset -2px -2px 5px rgba(255,255,255,0.6),
  inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '15px',
  width: '200px',
  height: '200px',
  border: '7px solid #CAF0F8',

}


function Profile({user, changeView, props}) {
  const [addItem, setAddItem] = useState(false);

  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [itemsData, setItemsData] = useState([])
// props.changeView
  useEffect(() => {
    console.log('CURRENT USER', user)

      setUserName(user.name)
      setUserImage(user.thumbnail_url || 'https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg')
      setUserDescription(user.description)
    },[props])

  //GET ITEMS FOR CURRENT USER

  useEffect(()=> {
    axios.get('/items/user/3')
    .then((res)=> {
      setItemsData(res.data)
      console.log('ITEM DATA', res.data)
    })
  }, [user])


  return (
    <>
      {!addItem
          && (
          <PictureContainer >
                   <SearchIcon sx={{
  boxShadow: `5px 5px 10px #9ab6bc,
  -5px -5px 10px #faffff`,
  borderRadius: '2000px',
  backgroundColor: '#CAF0F8',
  border: 'none',
  color: '#505050',
  marginTop: '15px',
  zIndex: 1000,
  width: '50px',
  height: '50px'
}}/>
            <Box1>
              <Avatar sx={avatarSX} src={userImage}/>
              <Box2>
              <div>Hello {userName}</div>
              <div>"{userDescription}"</div>
              </Box2>
            </Box1>

            <ItemsForTrade user={user} itemsData={itemsData} setAddItem={setAddItem} addItem={addItem}  />
            <PendingTrades  changeView={changeView} userData={{id: 1, thumbnail_url: userImage}} />
            <BookmarkedItems userData={{id: 1, thumbnail_url: userImage}} />
          </PictureContainer>
          )}
      {addItem
          && (
            <AddItem setAddItem={setAddItem} addItem={addItem} />
          )}
    </>

  );
}
export default Profile
