import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/Newnavbaar/Newnav';
import Maincomponent from './components/home/Maincomponent';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_signin/Sign_in';
import Sign_up from './components/signup_signin/Sign_up';
import Cart from './components/Cart/Cart';
import Buynow from './components/buy now/Buynow';
import { Routes, Route } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  const [data, setData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])
  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route path="/" element={<Maincomponent />} />
              <Route path="/login" element={<Sign_in />} />
              <Route path="/register" element={<Sign_up />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
      }

    </>
  );
}

export default App;
