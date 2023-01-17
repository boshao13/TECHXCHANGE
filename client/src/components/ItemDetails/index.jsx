import React, { useState, useEffect } from 'react';
import {
  Button, IconButton, Avatar, Box, Typography, Container
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Add, Home } from '@mui/icons-material';
import axios from 'axios';
import * as API from '../../API.js';
import ProposeTradeForm from './ProposeTradeForm';
import {styled} from '@mui/system';


function Item(props) {
  const [userId, setUserId] = useState(props.userId);
  const [currentUserDescription, setCurrentUserDescription] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [profilePhotoThumbnail, setProfilePhotoThumbnail] = useState('');
  const [currentUserLocation, setCurrentUserLocation] = useState({});

  const [itemId, setItemId] = useState(props.item.id);
  const [itemPhoto, setItemPhoto] = useState(props.item.thumbnail_url);
  const [itemTitle, setItemTitle] = useState(props.item.name);
  const [itemDetails, setItemDetails] = useState(props.item.description);
  const [itemCondition, setItemCondition] = useState(props.item.condition);


  const Box1 = styled('div')({
    backgroundColor: '#CAF0F8',
    alignContent: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column' ,
    justifyContent: 'flex-start',
    boxShadow: `-5px -5px 10px rgba(255,255,255,0.8),
    5px 5px 10px rgba(0,0,0,0.25)`,
    borderRadius: '30px',
    marginBottom: '20px',
    // height: '25vh',
    width: '100%',
  });

  const AddButton = styled('button')({
    width: '100px',
    height: '30px',
    boxShadow: `-3px -3px 3px rgba(232,242,255,0.8),
    5px 5px 10px rgba(0,0,0,0.25)`,
    borderRadius: '30px',
    backgroundColor: '#CAF0F8',
    border: '4px solid #CAF0F8',
    color: '#505050',
  })

  useEffect(() => {
    API.getUserFromID(userId)
    .then((response) => {
    console.log('Zip: ', response.data);
    console.log('User Info: ', response.data[0])
    console.log('Item Id: ', itemId);
    setCurrentUserDescription(response.data[0].description)
    setCurrentUserEmail(response.data[0].email)
    setProfilePhotoThumbnail(response.data[0].thumbnail_url)
    setCurrentUserLocation({ 'street': response.data[0].street, 'zip': response.data[0].zip_code })
    }).catch((error) => {
      console.log(error);
    })}, [itemId]);


  const onProposeTradeClick = (e) => {
    e.preventDefault();
    props.setDisplayItemDetails(false);
    props.setDisplayProposeTradeForm(true);
    // navigate to proposal form
  };

  const onHomeButtonClick = (e) => {
    e.preventDefault();
    props.setDisplayItemDetails(false);
    // navigate to profile page
  };

  const onAddButtonClick = (e) => {
    e.preventDefault();
    // const bookmarkObj = {
    //   itemID: itemId,
    //   userID: userId,
    // };
    // axios.post('http://localhost:8080/bookmarks', bookmarkObj)
    //   .then(() => {
    //     console.log('bookmark added');
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Container>
      <ProposeTradeForm displayProposeTradeForm={props.displayProposeTradeForm} currentUserId={props.currentUserId} userId={userId} itemPhoto={itemPhoto} itemId={itemId}/>
      <Box id="itemDetails" sx={props.displayItemDetails ? {display: 'block'} : {display: 'none'}}>
        <Box id="topButtons" sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            id="homeButton"
            onClick={(e) => { onHomeButtonClick(e); }}>
            <Home />
          </IconButton>
          <IconButton
            id="addBookmarkButton"
            onClick={(e) => { onAddButtonClick(e); }}>
            <Add/>
          </IconButton>
        </Box>

        <Box1 id="itemPhotoBox">
          <img id="itemPhoto" style={{ height:'200px', width: '290px', borderRadius: '30px'}} src={itemPhoto} alt="" />
        </Box1>

        <Box1 id="itemTitleBox">
          <Typography id="itemTitle" variant="h3">{itemTitle}</Typography>
        </Box1>

        <Box1 id="userInfo" >
          <Avatar id="profilePhotoThumbnail" alt="" src={profilePhotoThumbnail} />
          <Box id="userLocation">
            <Typography id="location"><u>Location</u>:</Typography>
            {console.log(currentUserLocation.zip)}
            <Typography id="zip">{currentUserLocation.zip}</Typography>
          </Box>
        </Box1>

        <Box1 id="itemDetails" >
          <Typography id="details" ><u>Details</u>: {itemDetails}</Typography>
        </Box1>

        <Box1 id="itemCondition" >
          <Typography id="details"><u>Condition</u>: {itemCondition}</Typography>
        </Box1>

        <Box id="proposeTrade">
          <AddButton id="goToProposeTradeForm" onClick={(e) => { onProposeTradeClick(e); }}>
            Propose Trade
          </AddButton>
        </Box>
      </Box>
    </Container>
    );
}

export default Item;