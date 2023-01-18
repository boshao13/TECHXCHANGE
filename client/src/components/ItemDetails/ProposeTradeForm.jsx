import React, { useState, useEffect } from 'react';
import {
  Button, IconButton, Avatar, Box, Typography, Container
} from '@mui/material';
import { Home, Add } from '@mui/icons-material';
import axios from 'axios';
import { getItemsFromUserID, createTrade } from '../../API.js';
import {styled} from '@mui/system';

function ProposeTradeForm(props) {
  const [userDevices, setUserDevices] = useState([]);
  const [selectedUserDevice, setSelectedUserDevice] = useState();
  const [proposeTradeObj, setProposeTradeObj] = useState({});

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

  const additionalUserItemsStyling = {
    flexDirection: 'row' ,
    justifyContent: 'center',
  }

  const additionalSelectedItemStyling = {
    flexDirection: 'column' ,
    justifyContent: 'center',
    marginTop: '20px',
  }

  const additionalButtonStyling = {
    display: 'flex',
    justifyContent: 'center',
  };

  const additionalTitleStyling = {
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  }

  const additionalTopButtonsStyling = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }

  const avatarSX = {
    marginBottom:'10px',
    boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
    8px 8px 12px rgba(0,0,0,0.25),
    inset -2px -2px 5px rgba(255,255,255,0.6),
    inset 2px 2px 4px rgba(0,0,0,0.3)`,
    width: '75px',
    height: '75px',
    border: '4px solid #CAF0F8',
  }

  useEffect(() => {
    getItemsFromUserID(props.currentUserId)
    .then((response) => {
      console.log(response.data);
      setUserDevices(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }, [props.currentUserId]);

  const setDevice = (e, id) => {
    e.preventDefault(e);
    setSelectedUserDevice(id);
    document.getElementById(id).style.border = 'solid 4px blue';
  }

  const onSubmitProposal = (e) => {
    e.preventDefault();
    createTrade({
      "proposer_id": props.currentUserId,
      "proposer_device_id": selectedUserDevice,
      "receiver_id": props.userId,
      "receiver_device_id": props.itemId,
      "status": "proposed"
    });
  };

  const onHomeButtonClick = (e) => {
    e.preventDefault();
  };

  const deviceMap = userDevices.map((device) => {
    return (
      <IconButton key={`button${device.id}`}>
        <Avatar sx={avatarSX} id={device.id} src={device.thumbnail_url} alt="" onClick={(e) => {setDevice(e, device.id)}}/>
      </IconButton>)
  });

  return (
    <Container>
      <Box sx={props.displayProposeTradeForm ? {display: 'block', marginTop: '10px'} : {display: 'none'}}>
       <Box sx={additionalTopButtonsStyling}>
          <IconButton onClick={(e) => { onHomeButtonClick(e); }}>
            <Home/>
          </IconButton>
          <IconButton>
            <Add />
          </IconButton>
        </Box>

      <Box sx={additionalTitleStyling}>
        <Typography variant="h4">Propose Trade</Typography>
      </Box>

      <form onSubmit={(e) => {onSubmitProposal(e)}}>
        <Box1 sx={additionalSelectedItemStyling}>
          <Typography sx={{margin: '10px'}}>Proposing a trade for:</Typography>
          <Avatar sx={avatarSX} id={props.itemId} src={props.itemPhoto} alt="" />
        </Box1>

        <Box1 sx={additionalUserItemsStyling}>
          <Typography sx={{margin: '10px'}}>Select a device to trade:</Typography>
            {deviceMap}
        </Box1>

        <Box sx={additionalButtonStyling}>
          <ProposeTradeButton type="submit">
            Propose Trade
          </ProposeTradeButton>
        </Box>
      </form>
      </Box>
    </Container>
  );
}

export default ProposeTradeForm;