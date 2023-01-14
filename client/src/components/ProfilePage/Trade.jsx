import React from 'react'
import API from '../../API.js'

const Trade = ({yourData, type, trade}) => {
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});
  // trade = {id,
  //   proposer_id, proposer_device_id,
  //   receiver_id, receiver_device_id,
  //   status}

  const setTheirUserData = (userID) => {
    API.getUserFromID(userID)
    .then(res => {
      setTheirData(res.data);
    })
    .catch(err => {
      console.error('err in getUserFromID, Trade.js\n', err);
    })
  };

  const getSetItem = (traderID, who) => {
  API.getItemFromID(traderID)
  .then(res => {
    if(type === 'trade' && who === 'proposer') { //got back proposer item, set to your's
      setYourItem(res.data);
      setTheirUserData(trade.receiver_id);
    } else if(type === 'trade' && who === 'receiver') { //got back receiver item, set to their's
      setTheirItem(res.data);
    } else if(type === 'offer' && who === 'proposer') { //got back proposer item, set to their's
      setTheirItem(res.data);
      setTheirUserData(trade.proposer_id);
    } else if(type === 'offer' && who === 'receiver') { //got back receiver item, set to your's
      setYourItem(res.data);
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
