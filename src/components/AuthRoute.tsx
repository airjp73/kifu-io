import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import LoginForm from 'forms/LoginForm';

const AuthRoute: React.FunctionComponent<RouteProps> = ({
  component,
  ...rest
}) => {
  const [currentUser, isLoaded] = useCurrentUser();
  const Component = component as any;
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
