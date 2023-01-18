import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Auth from './Auth';
import Profile from './ProfilePage';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? 'null'));
  const [view, setView] = useState({ name: 'Auth', props: { setUser } });


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
    <Profile user={user}/>
  );

  const renderView = () => {
    switch (view.name) {
      case 'Auth':
        if (!user) return <Auth props={view.props} />;
        changeView('Profile', { user, changeView });
        break;
      case 'Profile':
        return <Profile props={view.props} />;
      default:
        return null;
    }
    return null;
  };

  return renderView();
}
