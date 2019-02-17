import React from 'react';
import Header from 'components/Header';

const HelloPage: React.FunctionComponent = () => {
  return (
    <>
      <Header onMenuClick={() => console.log('Menu opened!')}>Home</Header>
    </>
  );
};

export default HelloPage;
