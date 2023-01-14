import React from 'react'
import API from '../../API.js'

const Trade = ({userData, type, trade}) => {
  const [theirUserData, setTheirUserData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});
  // trade = {id,
  //   proposer_id, proposer_device_id,
  //   receiver_id, receiver_device_id,
  //   status}

  const setTheirUserFromID = (userID) => {
    API.getUserFromID(userID)
    .then(res => {
      setTheirUserData(res.data);
    })
    .catch(err => {
      console.error('err in getUserFromID, Trade.js\n', err);
    })
  };
  const getSetItem = (traderID, val) => {
  API.getItemFromID(traderID)
  .then(res => {
    if(type === 'trade' && val === 'proposer') {
      setYourItem(res.data);
      setTheirUserFromID(trade.receiver_id);
    } else if(type === 'trade' && val === 'receiver') {
      setTheirItem(res.data);
    } else if(type === 'offer' && val === 'proposer') {
      setTheirItem(res.data);
    } else if(type === 'offer' && val === 'receiver') {
      setYourItem(res.data);
      setTheirUserFromID(trade.receiver_id);
    }
    res.data
  })
  .catch(err => {
    console.error('ERR in getItemFromUserId\n', err);
  })
};

getSetItem(trade.proposer_id, 'proposer');
getSetItem(trade.receiver_id, 'receiver');





  return (
    <div>Trade</div>
  )
}

export default Trade


// /////////////

// 1. git co main
// 2. git pull origin development
// 3. git co -b <your-branch-name>
