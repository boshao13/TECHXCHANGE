import axios from 'axios';

//all functions are promises, so "THEN-able"

export default function axiosCall(method, endpoint, data) {
  const url = `${process.env.URL}${endpoint}`;
  return new Promise((resolve, reject) => {
    axios({method, url, data })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })
}
//////////////////////////////////////////////////

export function getAllInvolvedTrades(userID) {
  return new Promise((resolve,reject) => {
    axiosCall('post', '/get/trades/involved', {userID})
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function getItemFromID(itemID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/item/${itemID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function getUserFromID(userID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/user/${userID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function updateTradeFromID(tradeID, currentTradeStatus) {
  const statusList = ['proposed', 'approved', 'completed'];
  if(currentTradeStatus === 'completed') {return 'trade already completed'};
  var newStatus = statusList[statusList.indexOf(currentTradeStatus) + 1];
  return new Promise((resolve,reject) => {
    axiosCall('post', `/trade/status/${tradeID}/${newStatus}`)
    .then(res => {
      resolve({message: 'successful', newStatus});
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

