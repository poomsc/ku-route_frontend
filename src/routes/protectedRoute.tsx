import React from 'react'

import { Redirect } from 'react-router-dom'
import applicationStore from 'stores/applicationStore'

const protectedRoute = (RouteComponent: () => JSX.Element) => {
  if (applicationStore.user) {
    return <RouteComponent />
  }
  return <Redirect to="/connect" />
}

export default protectedRoute
