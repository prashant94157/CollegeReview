import React from 'react';

const Alert = ({ children }) => (
  <div className='absolute w-full text-lg font-bold text-center bg-red-500 top-24'>
    <div>{children}</div>
  </div>
);

export default Alert;
