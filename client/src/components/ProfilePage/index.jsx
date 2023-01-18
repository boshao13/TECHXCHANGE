import React, { useState, useEffect } from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';
import ItemsForTrade from './ItemsForTrade';
import BookmarkedItems from './BookmarkedItems'
import AddItem from './AddItem';
import { styled } from '@mui/system';
import axios from 'axios';
///


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


function Profile({changeView, props}) {
  const [addItem, setAddItem] = useState(true);
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')
  const [userDescription, setUserDescription] = useState('')

// props.changeView
  useEffect(() => {
    axios.get('http://localhost:8080/users/user/2')
    .then((response)=> {
      console.log('data is', response.data[0])
      setUserName(response.data[0].name)
      setUserImage(response.data[0].thumbnail_url)
      setUserDescription(response.data[0].description)
    })
    .catch(err => {
      console.error(err);
    })
  },[props])

  return (
    <>
      {!addItem
          && (
          <PictureContainer >
            <Box1>
              <Avatar sx={avatarSX} src={userImage}/>
              <Box2>
              <div>Hello {userName}</div>
              <div>"{userDescription}"</div>
              </Box2>
            </Box1>
            <ItemsForTrade setAddItem={setAddItem} addItem={addItem} />
            {/* <PendingTrades  userData={props.user} /> */}
            <BookmarkedItems/>
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
