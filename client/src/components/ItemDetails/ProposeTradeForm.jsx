import React, { useState, useEffect } from 'react';
import {
  Button, IconButton, Avatar, Box, Typography, Container
} from '@mui/material';
import axios from 'axios';
import { getItemFromUserID, createTrade } from '../../API.js';

function ProposeTradeForm(props) {

  const [userDevices, setUserDevices] = useState([]);
  const [selectedUserDevice, setSelectedUserDevice] = useState();
  const [proposeTradeObj, setProposeTradeObj] = useState({});

  useEffect(() => {
    getItemsFromUserID(props.currentUserId)
    .then((response) => {
      setUserDevices(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  const setDevice = (e, id) => {
    e.preventDefault(e);
    setSelectedUserDevice(id);
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

  const deviceMap = userDevices.map((device) => {
    return <IconButton onClick={(e) => {setDevice(e, device.id)}}><Avatar id={device.id} src={device.thumbnail_url} alt="" /></IconButton>
  });

  return (
    <Container sx={props.displayProposeTradeForm ? {display: 'block', marginTop: '10px'} : {display: 'none'}}>
      <Box id="proposeTrade" sx={{ display: 'flex', justifyContent: 'center'}}>
        <Typography id="proposeTradeFormLabel" variant="h4">Propose Trade</Typography>
      </Box>

      <form onSubmit={(e) => {onSubmitProposal(e)}}>
        <Typography>Select a device to trade:</Typography>
        <Box id="userItems" sx={{ display: 'flex', justifyContent: 'center'}}>
          {deviceMap}
        </Box>
        <Typography>Proposing a trade for:</Typography>
        <Avatar id={props.itemId} src={props.itemPhoto} alt="" />
        <Button type="submit" id="proposeTrade" variant="outlined">
          Propose Trade
        </Button>
      </form>

    </Container>
  );
}

export default ProposeTradeForm;