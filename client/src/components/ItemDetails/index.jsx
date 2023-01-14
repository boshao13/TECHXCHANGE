/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React, { useState, useEffect } from 'react';
import {
  Container, Button, IconButton, HomeIcon, AddIcon, Avatar,
} from '@mui/material';
import axios from 'axios';

export default function Item(props) {
  const [userId, setUserId] = useState(props.item.userID);
  const [profilePhotoThumbnail, setProfilePhotoThumbnail] = useState('');
  const [userLocation, setUserLocation] = useState('');
  // const [userName, setUserName] = useState('');

  const [itemId, setItemId] = useState(props.item.ID);
  const [itemPhoto, setItemPhoto] = useState(props.item.thumbnail);
  const [itemTitle, setItemTitle] = useState(props.item.itemName);
  const [itemDetails, setItemDetails] = useState(props.item.description);
  const [itemCondition, setItemCondition] = useState(props.item.condition);

  useEffect(() => {
    for (let i = 0; i < props.allUsers; i++) {
      if (props.allUsers[i].ID === userId) {
        setProfilePhotoThumbnail(props.allUsers[i].thumbnail);
        setUserLocation(props.allUsers[i].location);
        // setUserName(props.allUsers[i].name);
      }
    }
  }, [props.item]);

  const onProposeTradeClick = (e) => {
    e.preventDefault();
    // navigate to proposal form
  };

  const onHomeButtonClick = (e) => {
    e.preventDefault();
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
    <Container id="itemDetails">
      <div id="topButtons">
        <IconButton id="homeButton" onClick={(e) => { onHomeButtonClick(e); }}>
          <HomeIcon />
        </IconButton>
        <IconButton id="addBookmarkButton" onClick={(e) => { onAddButtonClick(e); }}>
          <AddIcon />
        </IconButton>
      </div>

      <div id="itemPhotoDiv">
        <img id="itemPhoto" src={itemPhoto} alt="" />
      </div>

      <div id="itemTitle">
        {itemTitle}
      </div>

      <div id="userInfo">
        <Avatar id="profilePhotoThumbnail" alt="" src={profilePhotoThumbnail} />
        {/* <div id="userName">
          {userName}
        </div> */}
        <div id="userLocation">
          {userLocation}
        </div>
      </div>

      <div id="itemDetails">
        {itemDetails}
      </div>

      <div id="itemCondition">
        {itemCondition}
      </div>

      <div id="proposeTrade">
        <Button id="proposeTradeButton" onClick={(e) => { onProposeTradeClick(e); }}>
          Propose Trade
        </Button>
      </div>
    </Container>
  );
}
