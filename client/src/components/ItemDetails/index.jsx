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
  const [itemCondition, setItemCondition] = useState(props.item.item_condition);

  const Box1 = styled('div')({
    backgroundColor: '#CAF0F8',
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    boxShadow: `-5px -5px 10px rgba(255,255,255,0.8),
    5px 5px 10px rgba(0,0,0,0.25)`,
    borderRadius: '30px',
    marginBottom: '20px',
  });

  const ImgBox = styled('div')({
    boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
    8px 8px 12px rgba(0,0,0,0.25),
    inset -2px -2px 5px rgba(255,255,255,0.6),
    inset 2px 2px 4px rgba(0,0,0,0.3)`,
    marginBottom: '20px',
    height:'225px',
    width: '225px',
    borderRadius: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '5px'
  });

  const Image = styled('img')({
    height:'225px',
    width: '225px',
    borderRadius: '50%'
  });

  const ProposeTradeButton = styled('button')({
    position: 'fixed',
    bottom: '20px',
    width: '150px',
    height: '30px',
    boxShadow: `-3px -3px 3px rgba(232,242,255,0.8),
    5px 5px 10px rgba(0,0,0,0.25)`,
    borderRadius: '30px',
    backgroundColor: '#CAF0F8',
    border: '4px solid #CAF0F8',
    color: '#505050',
  });

  const additionalTopButtonsStyling = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }

  const additionalUserInfoStyling = {
    flexDirection: 'row' ,
    justifyContent: 'center',
  }

  const additionalTitleStyling = {
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  }

  const additionalItemInfoStyling = {
    justifyContent: 'flex-start',
    padding: '20px',
    height: '5vh'
  };

  const additionalButtonStyling = {
    display: 'flex',
    justifyContent: 'center',
  };

  const avatarSX = {
    marginBottom:'10px',
    boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
    8px 8px 12px rgba(0,0,0,0.25),
    inset -2px -2px 5px rgba(255,255,255,0.6),
    inset 2px 2px 4px rgba(0,0,0,0.3)`,
    marginTop: '15px',
    width: '75px',
    height: '75px',
    border: '4px solid #CAF0F8',
    marginRight: '20px'
  }


  useEffect(() => {
    API.getUserFromID(userId)
    .then((response) => {
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
  };

  const onHomeButtonClick = (e) => {
    e.preventDefault();
    props.setDisplayItemDetails(false);
  };

  const onAddButtonClick = (e) => {
    e.preventDefault();
    const bookmarkObj = {
      itemID: itemId,
      userID: userId,
    };
    axios.post('http://localhost:8080/bookmark', bookmarkObj)
      .then(() => {
        console.log('bookmark added');
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <ProposeTradeForm
        displayProposeTradeForm={props.displayProposeTradeForm}
        currentUserId={props.currentUserId}
        userId={userId}
        itemPhoto={itemPhoto}
        itemId={itemId}/>

      <Box sx={props.displayItemDetails ? {display: 'block'} : {display: 'none'}}>
        <Box sx={additionalTopButtonsStyling}>
          <IconButton onClick={(e) => { onHomeButtonClick(e); }}>
            <Home />
          </IconButton>
          <IconButton onClick={(e) => { onAddButtonClick(e); }}>
            <Add/>
          </IconButton>
        </Box>

        <ImgBox>
          <Image src={itemPhoto} alt=""/>
        </ImgBox>

        <div style={additionalTitleStyling}>
          <Typography variant='h4' >{itemTitle}</Typography>
        </div>


        <Box1 sx={additionalUserInfoStyling}>
          <Avatar sx={avatarSX} alt="" src={profilePhotoThumbnail}/>
          <Box>
            <Typography><u>Location</u>:</Typography>
            <Typography>{currentUserLocation.zip}</Typography>
          </Box>
        </Box1>

        <Box1 sx={additionalItemInfoStyling}>
          <Typography><u>Details</u>: {itemDetails}</Typography>
        </Box1>

        <Box1 sx={additionalItemInfoStyling}>
          <Typography><u>Condition</u>: {itemCondition}</Typography>
        </Box1>

        <Box sx={additionalButtonStyling}>
          <ProposeTradeButton sx={userId === props.currentUserId ? {visibility: 'hidden'} : {visibility: 'visible'}} onClick={(e) => { onProposeTradeClick(e); }}>
            Propose Trade
          </ProposeTradeButton>
        </Box>
      </Box>
    </Container>
    );
}

export default Item;