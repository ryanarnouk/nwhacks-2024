import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row justify-between p-3'>
        <h1 className='font-bold text-5xl'>App Title</h1>
        <div className='flex flex-row justify-around'>
            <a className='text-white hover:text-sky-300 font-bold py-2 px-4 rounded'>
                Respiration
            </a>
            <a className='text-white hover:text-lime-300 font-bold py-2 px-4 rounded'>
                Vegetation
            </a>
        </div>
    </div>
  )
}

export default Navbar