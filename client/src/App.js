import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import MainData from './components/mainData';
import MainAssessment from './components/mainAssessment';
import React, { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const socket = io('http://127.0.0.1:105');

    // Event handling happens here
    socket.on('connect', () => {
      console.log('Connected to the web socket')

      socket.emit('get_data');
    });

    socket.on('data_response', (data) => {
      try {
        console.log(data);
        // const parsedData = JSON.parse(data);
        // console.log(parsedData);
      } catch {
        console.log("Error pulling data");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []); 
  
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      
      {/* Top Navbar */}
      <Navbar/>

      {/* Data/Dashboard Container */}
      <div className='flex flex-row'>
        
        {/* Main Data Dashboard (Left-side)*/}
        <div className='w-[75%] border-dashed'>
          <MainData/>
        </div>

        {/* Main Assessment Dashboard (Right-side)*/}
        <div className='w-[25%] border-dashed'>
          <MainAssessment/>
        </div>
      </div>      
    </div>
  );
}

export default App;
