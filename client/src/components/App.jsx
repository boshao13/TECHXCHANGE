/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './ProfilePage/index';
import Item from './ItemDetails/index.jsx';
import images from '../../assets/images.js';
import * as API from '../API.js';

export default function App() {
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    var userIDToFetch = 1;
    API.getUserFromID(1)
    .then((response) => {
      console.log(`USER DATA from ID ${userIDToFetch}\n`, response.data);
      setUser(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if(user.id) {
      API.getItemsFromUserID(user.id)
        .then((response) => {
          // console.log('ITEMS FROM USER\n', response.data);
          setUserItems(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
    <Profile user={user}/>
    </>
  );
}
