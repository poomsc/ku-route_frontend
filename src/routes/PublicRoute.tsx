// import { useStores } from 'hooks/useStore';
import { observer } from 'mobx-react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = observer(({ component: Component, restricted, ...rest }: any) => {
  // const {
  //   userStore: { isLogin },
  // } = useStores();
  const isLogin = true;

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
});

export default PublicRoute;
