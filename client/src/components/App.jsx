import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Auth from './Auth';
import Profile from './ProfilePage';
import Map1 from './SearchPage/Map';
import SearchPage from './SearchPage/index.jsx';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? 'null'));
  const [view, setView] = useState({ name: 'Auth', props: { setUser } });

  const changeView = (viewName, viewProps, isCallback = false) => (
    !isCallback ? setView({ name: viewName, props: viewProps })
      : () => setView({ name: viewProps, props: viewName })
  );

  const renderView = () => {
    switch (view.name) {
      case 'Auth':
        if (!user) return <Auth props={view.props} />;
        changeView('Profile', { user, changeView });
        break;
      case 'Profile':
        return <Profile user={user} changeView={changeView} props={view.props} />;
      case 'Map':
        return <Map1 />;
      case 'Search':
        return <SearchPage />
      default:
        return null;
    }
    return null;
  };

  return renderView();
}


// COLOR PALETTE
//#03045E #0077B6 #00B4D8 #90E0EF # CAF0F8
