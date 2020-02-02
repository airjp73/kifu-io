import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface WithRouterProps {
  children: (router: RouteComponentProps) => React.ReactElement;
}

const WithRouter: React.FunctionComponent<WithRouterProps &
  RouteComponentProps> = ({ children, ...rest }) => children(rest);

export default withRouter(WithRouter);
