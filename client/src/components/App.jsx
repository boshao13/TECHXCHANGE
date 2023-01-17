/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Profile from './ProfilePage/index';
import Item from './ItemDetails/index.jsx';
import images from '../../assets/images.js';
import * as API from '../API.js';

export default function App() {
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);

  console.log('App loaded...');

  useEffect(() => {
    console.log('getting user');
    setTheUser(1);
  }, []);

  const setTheUser = (num) => {
    API.getUserFromID(num)
    .then((response) => {
      console.log(`USER DATA from ID ${num}\n`, response.data[0]);
      setUser(response.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  };

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

  const setUserNow = () => {
    setTheUser($('#select-user').val());
  };


  return (
    <>
    <select onChange={setUserNow} id='select-user'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
    <Profile user={user}/>
    </>
  );
}
// COLORS
// #03045E #0077B6 #00B4D8 #90E0EF #CAF0F8
