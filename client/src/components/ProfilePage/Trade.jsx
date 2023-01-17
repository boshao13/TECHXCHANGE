import React from 'react'
import * as API from '../../API.js'
import Avatar from '@mui/material/Avatar';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {Card, Box} from '@mui/material/';


const Trade = ({yourData, type, trade}) => {
  const [thisTrade, setThisTrade] = React.useState({});
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});

  const [btnContent, setBtnContent] = React.useState('');
  // trade = {id,
  //   proposer_id, proposer_device_id,
  //   receiver_id, receiver_device_id,
  //   status}
  // console.log('loading Trades for type...', type, thisTrade);




  React.useEffect(() => { //set Trade
    console.log('YOUR ITEM', yourItem);
  }, [yourItem]);

  React.useEffect(() => { //set Trade
    if(trade) {
      setThisTrade(trade);
    }
  }, [trade]);

  React.useEffect(() => { //set Btn content
    //update BUTTON
    if(thisTrade.status) {
      if(thisTrade.status === 'proposed' && type === 'trade') {
        setBtnContent('Waiting for Approval..');
      } else if (thisTrade.status === 'proposed' && type === 'offer') {
        setBtnContent('APPROVE');
      } else if (thisTrade.status === 'approved' && type === 'trade') {
        setBtnContent('ACCEPT');
      } else if(thisTrade.status === 'approved' && type === 'offer') {
        setBtnContent('Waiting for Accept..');
      } else {
        setBtnContent('Completed');
      }
    }
  }, [thisTrade]);


  const updateTradeStatus = () => {
    //get req for trade based on iD
    // console.log('updating with id/status->', thisTrade.id, thisTrade.status);
    API.updateTradeFromID(thisTrade.id, thisTrade.status)
    .then(res => {
        API.getTradeFromID(thisTrade.id)
        .then(res => {
          // console.log('updated trade? -> ', res.data[0]);
          setThisTrade(res.data[0]);
        })
    })
    .catch(err => {
      console.error('err in updateTradeFromID, Trade.jsx\n', err);
    })
  };

  const setTheirUserData = (userID) => {
    API.getUserFromID(userID)
    .then(res => {
      setTheirData(res.data[0]);
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
      setYourItem(res.data[0]);
      setTheirUserData(trade.receiver_id);
    } else if(type === 'trade' && who === 'receiver') { //got back receiver item, set to their's
      setTheirItem(res.data[0]);
    } else if(type === 'offer' && who === 'proposer') { //got back proposer item, set to their's
      setTheirItem(res.data[0]);
      setTheirUserData(trade.proposer_id);
    } else if(type === 'offer' && who === 'receiver') { //got back receiver item, set to your's
      setYourItem(res.data[0]);
    }
  })
  .catch(err => {
    console.error('ERR in getItemFromUserId\n', err);
  })
};

React.useEffect(() => {
 if(thisTrade.id) {
  getSetItem(thisTrade.proposer_device_id, 'proposer');
  getSetItem(thisTrade.receiver_device_id, 'receiver');
 }
}, [thisTrade])



  return (
    <Card className='trade-box'>
      <div className='trade-your-item'>
        <Avatar sx={{width: 50, height: 50}} className='avatar1' src={yourData.thumbnail_url}/>
        <div className='img-box'>
          {/* <img className='img' src='https://www.w3schools.com/css/paris.jpg'></img> */}
        <img className='img' src={yourItem.thumbnail_url}/>
        </div>
      </div>
      <span className='swap-icon'>
      <SwapHorizIcon fontSize='inherit'/>
      </span>
      <div className='trade-their-item'>
        <Avatar sx={{width: 50, height: 50}} className='avatar2' src={theirData.thumbnail_url}/>
        {/* <span className='img-box'></span> */}
        <div className='img-box'>

        {/* <img className='img' src={theirItem.thumbnail_url}></img> */}
        {/* <img className='img' src='https://www.w3schools.com/css/paris.jpg'></img> */}
        <img className='img' src={theirItem.thumbnail_url}/>
        </div>
      </div>
      <div className='btn-trade-box'>
      <button className='btn-trade' onClick={e => {updateTradeStatus();}}>{btnContent}</button>
      </div>
    </Card>
  )
};

export default Trade;


// /////////////

// 1. git co main
// 2. git pull origin development
// 3. git co -b <your-branch-name>
