import React from 'react';

const headerStyle = {
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `blue`,
  height: '40px',
  marginTop: '-7px',
  color: 'white',
  position: 'sticky',
  top: '0',
  zIndex: '50',
};

const boldTextStyle = {
  fontWeight: '',
  fontSize: '20px'
};

function offer() {
  return (
    <div style={headerStyle}>
      <h1 style={boldTextStyle}>Welcome to InterviewShala</h1>
    </div>
  );
}

export default offer;