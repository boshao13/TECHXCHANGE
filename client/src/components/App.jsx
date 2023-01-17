// import React, { useState } from 'react';

// import Auth from './Auth';
// import Profile from './ProfilePage';
// import PendingTrades from './ProfilePage/PendingTrades.jsx';
// import $ from 'jquery';

// export default function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? 'null'));
//   const [view, setView] = useState({ name: 'Auth', props: { setUser } });
//   const [thisUser, setThisUser] = useState({
//     id: 1,
//     email: 'bob@gmail.com',
//     password: 'hey',
//     thumbnail_url: 'https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg',
//     description: 'im big',
//     street: '1 mangini way',
//     zip_code: '98028'
//   });

//   const changeView = (viewName, viewProps, isCallback = false) => (
//     !isCallback ? setView({ name: viewName, props: viewProps })
//       : () => setView({ name: viewProps, props: viewName })
//   );

//   const renderView = () => {
//     switch (view.name) {
//       case 'Auth':
//         if (!user) return <Auth props={view.props} />;
//         changeView('Profile', { user, changeView });
//         break;
//       case 'Profile':
//         return <Profile props={view.props} />;
//       default:
//         return null;
//     }
//     return null;
//   };

//   const users = {
//     one: {id: 1, thumbnail_url: 'https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg'},
//     two: {id: 2, thumbnail_url: 'https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg'},
//     three: {id: 3, thumbnail_url: 'https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png?fit=550%2C532&ssl=1'},
//   }

//   // // return renderView();
//   // const userData = {
//   //   id: 1,
//   //   email: 'bob@gmail.com',
//   //   password: 'hey',
//   //   thumbnail_url: 'https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg',
//   //   description: 'im big',
//   //   street: '1 mangini way',
//   //   zip_code: '98028'
//   // };

//   const setThisUser1 = () => {
//     var userNum = $('#this-user').val();
//     var obj = {};
//     Object.assign(obj, thisUser);
//     Object.assign(obj, users[userNum]);
//     console.log('Display user..', obj);
//     setThisUser(obj);
//     // userData.id = users[userNum].id;
//     // userData.thumbnail_url = users[userNum].img;
//   };
//   return (
//     <div>
//       <select id='this-user' onChange={setThisUser1}>
//         <option value='one'>1</option>
//         <option value='two'>2</option>
//         <option value='three'>3</option>
//       </select>
//       <PendingTrades userData={thisUser}/>
//     </div>
//   );
// }
