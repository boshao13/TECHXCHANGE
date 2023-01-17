import React from 'react'
import API from '../../API.js'
import Avatar from '@mui/material/Avatar';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Trade = ({yourData, type, trade}) => {
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});
  const [tradeStatus, setTradeStatus] = React.useState(trade.status);
  const [btnContent, setBtnContent] = React.useState('Approve');
  // trade = {id,
  //   proposer_id, proposer_device_id,
  //   receiver_id, receiver_device_id,
  //   status}

  React.useEffect(() => {
    //update BUTTON
    if(tradeStatus === 'Proposed' && type === 'trade') {
      setBtnContent('Waiting for Approval..');
    } else if (tradeStatus === 'Proposed' && type === 'offer') {
      setBtnContent('APPROVE');
    } else if (tradeStatus === 'Approved' && type === 'trade') {
      setBtnContent('ACCEPT');
    } else if(tradeStatus === 'Approved' && type === 'offer') {
      setBtnContent('Waiting for Accept..');
    }
  }, [tradeStatus])


  const refreshTradeStatus = () => {
    //get req for trade based on iD
    API.getTradeFromID(trade.id)
    .then(res => {
      setTradeStatus(res.data.status);
    })
    .catch(err => {
      console.error('err in getTradeFromID, Trade.jsx\n', err);
    })
  };
  const updateTradeStatus = () => {
    //get req for trade based on iD
    API.updateTradeFromID(trade.id, tradeStatus)
    .then(res => {
      if(res.message === 'successful') {
        setTradeStatus(res.newStatus)
      } else {
        console.log('RES but ERROR in updateTradeFromID, Trade.jsx\n', res);
      }
    })
    .catch(err => {
      console.error('err in updateTradeFromID, Trade.jsx\n', err);
    })
  };

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
    <div className='trade-box'>
      <div className='trade-your-item'>
        <Avatar source={yourData.thumbnail_url}/>
        <img src={yourItem.thumnail_url}/>
      </div>
      <SwapHorizIcon />
      <div className='trade-their-item'>
        <Avatar source={theirData.thumbnail_url}/>
        <img src={theirItem.thumnail_url}/>
      </div>
      <button>{btnContent}</button>
    </div>
  )
}

export default Trade


// /////////////

// 1. git co main
// 2. git pull origin development
// 3. git co -b <your-branch-name>
