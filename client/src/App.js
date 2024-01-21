import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import MainData from './components/mainData';
import MainAssessment from './components/mainAssessment';
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Parser from './helpers/Parser';

const App = () => {
  const [data, setData] = useState({
    pressure: {value: 0, unit: 'hPa'},
    temperature: {value: 0, unit: '°C'}, 
    humidity: {value: 0, unit: '%'},
    iaq:{value: 0, unit: 'PPM'},
    iaq_accuracy:{value: 0, unit: 'PPM'},
    co2_equivalent:{value: 0, unit: 'PPM'},
    breath_voc_equivalent:{value: 0, unit: 'PPM'},
    latitude:{value: 0, unit: '°'},
    longitude:{value: 0, unit: '°'},
    altitude:{value: 0, unit: 'm'}
  });

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const socket = io('http://127.0.0.1:105');

    // Event handling happens here
    socket.on('connect', () => {
      console.log('Connected to the web socket')

      socket.emit('get_data');
    });

    socket.on('data_response', (data) => {
      try {
        let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'
        let result = utf8decoder.decode(data.data)
        let parsedResult = Parser(result)
        const id = Object.keys(parsedResult);
        if (id.length !== 0) {
          console.log(parsedResult[id[0]])
          console.log(id[0])
          updateDataValue(id[0], parsedResult[id[0]])
        }
      } catch (err) {
        console.log("Error pulling data", err);
      }
    });

    const updateDataValue = (key, newValue) => {
      setData((prevData) => ({
        ...prevData,
        [key]: { ...prevData[key], value: newValue.value },
      }));
    };

    return () => {
      socket.disconnect();
    };
  }, []); 

  
  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen">
      
      {/* Top Navbar */}
      <Navbar/>

      {/* Data/Dashboard Container */}
      <div className='flex flex-row'>
        
        {/* Main Data Dashboard (Left-side)*/}
        <div className='w-[75%]'>
          <MainData data={data} setFeedback={setFeedback}/>
        </div>

        {/* Main Assessment Dashboard (Right-side)*/}
        <div className='w-[25%]'>
          <MainAssessment data={data} feedback={feedback}/>
        </div>
      </div>      
    </div>
  );
}

export default App;
