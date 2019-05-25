import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';

const AuthRoute: React.FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [currentUser, isLoaded] = useCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoaded) return null;
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: 'login', state: { from: props.location.pathname } }}
          />
        );
      }}
    />
  );
};

export default AuthRoute;
