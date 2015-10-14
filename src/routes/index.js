import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/HomeView';
import DashboardView    from 'views/DashboardView';
import MainView    from 'views/MainView';
export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView} />
    <Route name='mainview' path='/mainview' component={MainView} />
  </Route>
);
