import React, { useState } from 'react';

import Auth from './Auth';
import Profile from './ProfilePage';

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
        return <Profile props={view.props} />;
      default:
        return null;
    }
    return null;
  };

  return renderView();
}
