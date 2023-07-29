import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { motion } from 'framer-motion';
import './App.css';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

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
    <Router>
      <div className='bg-[#181829] text-white font-sans'>
        <motion.div
          className='cursor'
          variants={variants}
          animate='default'
          transition={{ duration: 1 }}
        />
        <div className='relative z-20 w-full'>
          <Header />
          <div className='min-h-[253px]'>
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
  );
}

export default App;
