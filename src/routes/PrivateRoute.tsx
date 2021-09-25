import React from 'react'
import { observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'
import applicationStore from 'stores/applicationStore'
import { checkAuthState } from 'service/auth'
// import { useStores } from 'hooks/useStore';

const PrivateRoute = observer(({ component: Component, ...rest }: any) => {
  // checkAuthState()
  const { user } = applicationStore
  console.log('user', user)

  const isLogin = !!user

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  )
})

export default PrivateRoute
