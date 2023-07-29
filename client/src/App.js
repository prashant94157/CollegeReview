import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { motion } from 'framer-motion';
import './App.css';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Alert';
import Spinner from './components/Spinner';

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 300,
      y: mousePosition.y - 300,
    },
  };

  return (
    <Provider store={store}>
      <Router>
        <div className='bg-[#181829] text-white font-sans'>
          <motion.div
            className='w-[600px] h-[600px] rounded-full fixed left-0 top-0 z-10 bg-gradient-to-br to-[#647dee] from-[#7f53ac]'
            variants={variants}
            animate='default'
            transition={{ duration: 1 }}
          />
          <div className='relative z-20 w-full'>
            <Header />
            <Alert />
            <div className='min-h-[253px]'>
              {/* <Spinner /> */}
              <Routes>
                <Route path='/' element={<Homescreen component={Login} />} />
                <Route
                  path='/register'
                  element={<Homescreen component={Register} />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
