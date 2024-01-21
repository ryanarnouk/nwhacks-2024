import React from 'react';

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center p-3'>
      <h1 className='font-bold text-5xl dark:text-dark-tremor-content-emphasis'>
        Breathe
      </h1>
      <img
        src='/breathe_logo_no_background.png'  
        alt='Breathe Logo'
        className='my-2'
        style={{ width: '80px', height: 'auto' }}  
      />
    </div>
  );
};

export default Navbar;
