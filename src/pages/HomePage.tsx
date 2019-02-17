import React, { useState } from 'react';
import Header from 'components/Header';

const HelloPage: React.FunctionComponent = () => {
  return (
    <>
      <Header onMenuClick={() => alert('Menu opened!')}>Home</Header>
    </>
  );
};

export default HelloPage;
