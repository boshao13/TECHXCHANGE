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

const Trade = ({changeView, yourData, i, type, trade}) => {
  const [thisTrade, setThisTrade] = React.useState({});
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});

  const [btnDisabled, setBtnDisabled] = React.useState();
  const [btnContent, setBtnContent] = React.useState('');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => { //set Trade
    setTimeout(() => {
      setIsMounted(true);
    }, (70 * (2*i)));
  }, []);

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

const rerouteToItem = (item) => {
  console.log('ITEM to route to', item);
  console.log('changeView', changeView);
  // var propsObj = {userId: yourData.id, item, setDisplayItemDetails, setDisplayProposeTradeForm, displayProposeTradeForm,
  // currentUserId,
  // displayItemDetails,};

  // changeView('ItemDetails', propsObj)
};


return (
  <div className={`trade-box-anim ${isMounted && 'trade-box-1'}`}>

  <Card className='trade-box'>
      <div className='trade-your-item'>
        <Avatar sx={{width: 50, height: 50}} className='avatar1' src={yourData.thumbnail_url}/>
        <div className='img-box'>
        <img onClick={() => {rerouteToItem(yourItem)}} className='img' src={yourItem.thumbnail_url}/>
        </div>
      </div>
      <span className='swap-icon'>
      <SwapHorizIcon fontSize='inherit'/>
      </span>
      <div className='trade-their-item'>
        <Avatar sx={{width: 50, height: 50}} className='avatar2' src={theirData.thumbnail_url}/>
        <div className='img-box'>

        <img onClick={() => {rerouteToItem(theirItem)}} className='img' src={theirItem.thumbnail_url}/>
        </div>
      </div>
      <div className='btn-trade-box'>
      <Button sx={{width: '90%'}} disabled={btnDisabled} variant="outlined" className='btn-trade' onClick={e => {updateTradeStatus();}}>{btnContent}</Button>
      </div>
  </Card>
  </div>
  )
};

export default Trade;

