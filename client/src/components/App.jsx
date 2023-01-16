/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './ProfilePage/index';
import Item from './ItemDetails/index.jsx';

export default function App() {
  const [allItems, setAllItems] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/devices')
      .then((response) => {
        setAllItems(response);
      }).catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:8080/users')
      .then((response) => {
        setAllUsers(response);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Profile />
  );
}
// COLORS
// #03045E #0077B6 #00B4D8 #90E0EF #CAF0F8
