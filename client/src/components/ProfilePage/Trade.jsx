import React from 'react'
import * as API from '../../API.js'
import Avatar from '@mui/material/Avatar';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Card from '@mui/material/Card';


const Trade = ({yourData, type, trade}) => {
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});
  const [tradeStatus, setTradeStatus] = React.useState('');
  const [btnContent, setBtnContent] = React.useState('Approve');
  // trade = {id,
  //   proposer_id, proposer_device_id,
  //   receiver_id, receiver_device_id,
  //   status}
console.log('trade loaded...');

  React.useEffect(() => {
    if(trade.id) {
      console.log('TRADE: ', trade);
      setTradeStatus(trade.status);
    }
  },[trade]);


  React.useEffect(() => {
    //update BUTTON
    if(tradeStatus === 'proposed' && type === 'trade') {
      setBtnContent('Waiting for Approval..');
    } else if (tradeStatus === 'proposed' && type === 'offer') {
      setBtnContent('APPROVE');
    } else if (tradeStatus === 'approved' && type === 'trade') {
      setBtnContent('ACCEPT');
    } else if(tradeStatus === 'approved' && type === 'offer') {
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

  const getSetItem = (itemID, who) => {
  API.getItemFromID(itemID)
  .then(res => {
    // console.log(`ITEM from trade ITEMID (${itemID})\n`, res.data);
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
  })
  .catch(err => {
    console.error('ERR in getItemFromUserId\n', err);
  })
};

React.useEffect(() => {
 if(trade.id) {
  getSetItem(trade.proposer_device_id, 'proposer');
  getSetItem(trade.receiver_device_id, 'receiver');
 }
}, [trade])



  return (
    <Card className='trade-box'>
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
    </Card>
  )
};

export default Trade;


// /////////////

// 1. git co main
// 2. git pull origin development
// 3. git co -b <your-branch-name>
