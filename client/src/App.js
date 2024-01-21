import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import MainData from './components/mainData';
import MainAssessment from './components/mainAssessment';

function App() {
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
