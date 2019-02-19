import React from 'react';
import Header from 'components/Header';

const HelloPage: React.FunctionComponent = () => {
  return (
    <>
      <Header
        onMenuClick={() => {}} // TODO: Implement side menu
      >
        Home
      </Header>
    </>
  );
};

export default HelloPage;
