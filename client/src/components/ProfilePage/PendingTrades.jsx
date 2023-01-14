import React from 'react';
import API, {axiosCall} from '../../API.js';
import { Box } from '@mui/material/';
import Trade from './Trade.jsx';

function PendingTrades({userData}) {
// userData { id, email, password, thumnail_url, description, street, zip_code }
const [yourTrades, setYourTrades] = React.useState([]);
const [yourOffers, setYourOffers] = React.useState([]);
const [currentType, setCurrentType] = React.useState('trade'); //or OFFER
const [typeHTML, setTypeHTML] = React.useState('trade'); //or OFFER
const [tradeStyle, setTradeStyle] = React.useState([{display: 'block'},{display: 'none'}]); //or OFFER


React.useEffect(() => { //toggles view based on currentType
  var typeText = currentType === 'trade' ? 'Your Trades' : 'Your Offers';
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
  console.log('error trades involved', errTrades);
}) //Involved Trades set
.catch(err => {
  console.error('ERR in getAllInvolvedTrades', err);
})
};

const toggleTrade = () => {
  var type = currentType === 'trade' ? 'offer' : 'trade';
  setCurrentType(type);
}
const refreshTrades = () => {
  getSetTrades();
}


  return (
    <Box sx={{ bgcolor: '#ff9966', height: '20vh' }}>
      <div className='trade-header'>
        <span>
          <i onClick={e => {e.preventDefault(); toggleTrade()}} className="toggle-trade"></i>
          <span>{typeHTML}</span>
        </span>
      <i onClick={e => {e.preventDefault(); refreshTrades()}} className="refresh-trades"></i>
      </div>
      <div style={tradeStyle[0]} className='trade-list'>
      {yourTrades.map(trade => {
        return <Trade userData={userData} type={currentType} trade={trade}/>
      })}
      </div>
      <div style={tradeStyle[1]} className='offer-list'>
      {yourOffers.map(trade => {
        return <Trade userData={userData} type={currentType} trade={trade}/>
      })}
      </div>
    </Box>
  );
}
export default PendingTrades;
