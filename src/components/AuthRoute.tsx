import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import LoginForm from 'forms/LoginForm';

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
        return currentUser ? <Component {...props} /> : <LoginForm />;
      }}
    />
  );
};

export default AuthRoute;
