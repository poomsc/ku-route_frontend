import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Route, withRouter } from 'react-router'
import NotFound from 'pages/NotFound'
import HomePage from 'pages/Home'
import SignPage from 'pages/Sign'
import PostPage from 'pages/Post'
import EditProfilePage from 'pages/EditProfile'
import VersatilePostPage from 'pages/VersatilePost'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import NavBar from 'components/Navbar'
import protectedRoute from './protectedRoute'

const NAVBAR = withRouter(NavBar)

const Routes: React.FC = (): JSX.Element => {
  return (
    <Router>
      <NAVBAR />
      <Switch>
        <Route exact path={['/', '/home']} component={HomePage} />
        <Route exact path="/post" component={PostPage} />
        <Route path="/signin" component={SignPage} />
        <Route path="/signup" component={SignPage} />
        <Route
          path="/edit-profile"
          render={() => protectedRoute(EditProfilePage)}
        />
        <Route
          path="/create-post"
          render={() => protectedRoute(VersatilePostPage)}
        />
        <Route
          path="/edit-post"
          render={() => protectedRoute(VersatilePostPage)}
        />
        <Route component={NotFound} />
        {/* <PublicRoute
          restricted={false}
          exact
          path={['/', '/home']}
          component={HomePage}
        />
        <PrivateRoute exact path="/post" component={PostPage} />
        <PublicRoute restricted={true} path="/signin" component={SignPage} />
        <PublicRoute restricted={false} path="/signup" component={SignPage} />
        <PrivateRoute
          restricted={false}
          path="/edit-profile"
          component={EditProfilePage}
        />
        <PrivateRoute
          restricted={false}
          path="/create-post"
          component={VersatilePostPage}
        />
        <PrivateRoute
          restricted={false}
          path="/edit-post"
          component={VersatilePostPage}
        />
        <PublicRoute restricted={false} component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Routes
