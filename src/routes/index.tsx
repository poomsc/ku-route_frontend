import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import NotFound from 'pages/NotFound';
import HomePage from 'pages/Home';
import SignPage from 'pages/Sign';
import PostPage from 'pages/Post';
import CreatePostPage from 'pages/CreatePost';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NavBar from 'components/Navbar'
import EditProfilePage from 'pages/EditProfile'
import Test from 'components/UploadImage'

const NAVBAR = withRouter(NavBar)

const Routes: React.FC = (): JSX.Element => {
  return (
    <Router>
      <NAVBAR/>
      <Switch>
        <PublicRoute restricted={false} exact path={['/', '/home']} component={HomePage} />
        <PrivateRoute exact path="/post" component={PostPage} />
        <PublicRoute restricted={false} path="/signin" component={SignPage} />
        <PublicRoute restricted={false} path="/signup" component={SignPage} />
        <PublicRoute restricted={false} path="/create-post" component={CreatePostPage} />
        <PublicRoute restricted={false} path="/edit-profile" component={EditProfilePage} />
        <PublicRoute restricted={false} path="/up" component={Test} />
        <PublicRoute restricted={false} component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
