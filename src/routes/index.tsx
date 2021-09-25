import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import NotFound from 'pages/NotFound';
import HomePage from 'pages/Home';
import SignPage from 'pages/Sign';
import PostPage from 'pages/Post';
import CreatePostPage from 'pages/CreatePost';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NavBar from '../components/Navbar2'
import EditPostMenu from 'pages/EditPostMenu';
import FavouriteMenu from 'pages/FavouriteMenu';

const Routes: React.FC = (): JSX.Element => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <PublicRoute restricted={false} exact path={['/', '/home']} component={HomePage} />
        <PrivateRoute exact path="/post" component={PostPage} />
        <PublicRoute restricted={false} path="/signin" component={SignPage} />
        <PublicRoute restricted={false} path="/signup" component={SignPage} />
        <PublicRoute restricted={false} path="/create-post" component={CreatePostPage} />
        <PublicRoute restricted={false} path="/edit-post-page" component={EditPostMenu} />
        <PublicRoute restricted={false} path="/favourite-page" component={FavouriteMenu} />
        <PublicRoute restricted={false} component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
