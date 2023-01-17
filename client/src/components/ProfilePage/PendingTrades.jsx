import React from 'react';
import * as API from '../../API.js';
import Trade from './Trade.jsx';

import { Box, Switch } from '@mui/material/';
import {styled} from '@mui/system'
import RefreshIcon from '@mui/icons-material/Refresh';

const Box1 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'flex-start',
  boxShadow: `-5px -5px 10px rgba(255,255,255,0.8),
  5px 5px 10px rgba(0,0,0,0.25)`,
  borderRadius: '30px',
  marginBottom: '20px',
  height: '25vh',
  width: '100%',
});




function PendingTrades({userData}) {
// userData { id, email, password, thumnail_url, description, street, zip_code }
const [yourTrades, setYourTrades] = React.useState([]);
const [yourOffers, setYourOffers] = React.useState([]);
const [currentType, setCurrentType] = React.useState('trade'); //or OFFER
const [typeHTML, setTypeHTML] = React.useState('Showing Your Trades'); //or OFFER
const [tradeStyle, setTradeStyle] = React.useState([{display: 'block'},{display: 'none'}]); //or OFFER

React.useEffect(() => { //toggles view based on currentType
  if(userData.id) {
    console.log('USER DATA in PENDING Trades\n', userData);
    getSetTrades();
  }
}, [userData])

React.useEffect(() => { //toggles view based on currentType
  var typeText = currentType === 'trade' ? 'Showing Your Trades' : 'Showing Your Offers';
  setTypeHTML(typeText);
  setTradeStyle([tradeStyle[1],tradeStyle[0]]);

}, [currentType])

//First
const getSetTrades = () => {
API.getAllInvolvedTrades(userData.id)
.then(res => {
  var tempTrades = [];
  var tempOffers = [];
  var errTrades = [];
  res.data.forEach((trade, i) => {
    if(trade.proposer_id === userData.id) {
      tempTrades.push(trade);
    } else if(trade.receiver_id === userData.id) {
      tempOffers.push(trade);
    } else {
      errTrades.push(trade);
    }
  }); //end forEach
  setYourTrades(tempTrades);
  setYourOffers(tempOffers);
  if(errTrades.length) {console.log('error trades involved', errTrades)}
}) //Involved Trades set
.catch(err => {
  console.error('ERR in getAllInvolvedTrades', err);
})
};

const toggleTrade = () => {
  var type = currentType === 'trade' ? 'offer' : 'trade';
  setCurrentType(type);
}


  return (
    <Box1 sx={{ bgcolor: '#ff9966', height: '20vh' }}>
      <div className='trade-header'>
        <span>
        <Switch defaultChecked onClick={e => {e.preventDefault(); toggleTrade()}} className="toggle-trade"/>
          <span>{typeHTML}</span>
        </span>
        <RefreshIcon  onClick={e => {e.preventDefault(); getSetTrades()}} className="refresh-trades"/>
      </div>
      <div style={tradeStyle[0]} className='trade-list'>
      {yourTrades.map(trade => {
        return <Trade key={trade.id} yourData={userData} type={currentType} trade={trade}/>
      })}
      </div>
      <div style={tradeStyle[1]} className='offer-list'>
      {yourOffers.map(trade => {
        return <Trade key={trade.id} yourData={userData} type={currentType} trade={trade}/>
      })}
      </div>
    </Box1>
  );
}
export default PendingTrades;
