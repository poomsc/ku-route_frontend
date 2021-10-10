// import { useStores } from 'hooks/useStore';
import { observer } from 'mobx-react'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import applicationStore from 'stores/applicationStore'

const PublicRoute = observer(
  ({ component: Component, restricted, ...rest }: any) => {
    const { user } = applicationStore
    const isLogin = !!user

    return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route
        {...rest}
        render={(props) =>
          isLogin && restricted ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    )
  }
)

export default PublicRoute
