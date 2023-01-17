import React from 'react'
import * as API from '../../API.js'
import Avatar from '@mui/material/Avatar';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {Card, Box, Button} from '@mui/material/';

// trade = {id,
//   proposer_id, proposer_device_id,
//   receiver_id, receiver_device_id,
//   status}
// console.log('loading Trades for type...', type, thisTrade);

const Trade = ({yourData, type, trade}) => {
  const [thisTrade, setThisTrade] = React.useState({});
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});

  const [btnDisabled, setBtnDisabled] = React.useState();
  const [btnContent, setBtnContent] = React.useState('');


  React.useEffect(() => { //set Trade
    console.log('YOUR ITEM', yourItem);
  }, [yourItem]);
  React.useEffect(() => { //set btnContent
    if(btnContent.slice(0,4) === 'Pend' || btnContent.slice(0,4) === 'Comp') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [btnContent]);

  React.useEffect(() => { //update this trade
    if(trade) {
      setThisTrade(trade);
    }
  }, [trade]);

  React.useEffect(() => { //set Btn content
    //update BUTTON
    if(thisTrade.status) {
      if(thisTrade.status === 'proposed' && type === 'trade') {
        setBtnContent('Pending Approval..');
      } else if (thisTrade.status === 'proposed' && type === 'offer') {
        setBtnContent('APPROVE');
      } else if (thisTrade.status === 'approved' && type === 'trade') {
        setBtnContent('ACCEPT');
      } else if(thisTrade.status === 'approved' && type === 'offer') {
        setBtnContent('Pending Accept..');
      } else {
        setBtnContent('Completed');
      }
    }
  }, [thisTrade]);


  const updateTradeStatus = () => {

    API.updateTradeFromID(thisTrade.id, thisTrade.status)
    .then(res => {
        API.getTradeFromID(thisTrade.id)
        .then(res => {
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
    if(type === 'trade' && who === 'proposer') {
      setYourItem(res.data[0]);
      setTheirUserData(trade.receiver_id);
    } else if(type === 'trade' && who === 'receiver') {
      setTheirItem(res.data[0]);
    } else if(type === 'offer' && who === 'proposer') {
      setTheirItem(res.data[0]);
      setTheirUserData(trade.proposer_id);
    } else if(type === 'offer' && who === 'receiver') {
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
        <img className='img' src={yourItem.thumbnail_url}/>
        </div>
      </div>
      <span className='swap-icon'>
      <SwapHorizIcon fontSize='inherit'/>
      </span>
      <div className='trade-their-item'>
        <Avatar sx={{width: 50, height: 50}} className='avatar2' src={theirData.thumbnail_url}/>
        <div className='img-box'>

        <img className='img' src={theirItem.thumbnail_url}/>
        </div>
      </div>
      <div className='btn-trade-box'>
      <Button disabled={btnDisabled} variant="outlined" className='btn-trade' onClick={e => {updateTradeStatus();}}>{btnContent}</Button>
      </div>
    </Card>
  )
};

export default Trade;

