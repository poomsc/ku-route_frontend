import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'
import applicationStore from 'stores/applicationStore'
import { checkAuthState } from 'service/auth'
// import { useStores } from 'hooks/useStore';

const PrivateRoute = observer(({ component: Component, ...rest }: any) => {
  const { user } = applicationStore
  // const isLogin = !!user || checkAuthState()
  // console.log({ isLogin, che: checkAuthState() })
  const [loginStatus, setLoginStatus] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setLoginStatus(!!user || await checkAuthState())
    }
    checkAuth()
  }, [])

  console.log(loginStatus + "FF")

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        loginStatus ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  )
})

export default PrivateRoute
