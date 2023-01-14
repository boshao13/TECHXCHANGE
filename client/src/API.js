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

export function getItemFromID(userID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/item/userid/${userID}`)
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
    axiosCall('get', `/item/userid/${userID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

