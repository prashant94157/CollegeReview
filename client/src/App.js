import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { motion } from 'framer-motion';
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundScreen from './screens/NotFoundScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import CollegeScreen from './screens/CollegeScreen';
import CollegeListScreen from './screens/CollegeListScreen';
import CollegeCreateEditScreen from './screens/CollegeCreateEditScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserScreen from './screens/UserScreen';
import PlanCreateEditScreen from './screens/PlanCreateEditScreen';
import PlanListScreen from './screens/PlanListScreen';
import PlanScreen from './screens/PlanScreen';
import ReviewCreateEditListScreen from './screens/ReviewCreateEditListScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import ReviewScreen from './screens/ReviewScreen';

const App = () => {
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
          className='w-[600px] h-[600px] rounded-full fixed left-0 top-0 z-10 bg-gradient-to-br to-[#647dee] from-[#7f53ac]'
          variants={variants}
          animate='default'
          transition={{ duration: 1 }}
        />
        <div className='relative z-20 w-full'>
          <Header />
          <div className='min-h-screen'>
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />

              <Route path='/users/:id/edit' element={<UserEditScreen />} />
              <Route path='/users' element={<UserListScreen />} />
              <Route path='/users/:id' element={<UserScreen />} />

              <Route path='/plans/create' element={<PlanCreateEditScreen />} />
              <Route
                path='/plans/:id/edit'
                element={<PlanCreateEditScreen />}
              />
              <Route path='/plans' element={<PlanListScreen />} />
              <Route path='/plans/:id' element={<PlanScreen />} />

              <Route
                path='/colleges/:id/reviews/:id/edit'
                element={<ReviewCreateEditListScreen />}
              />
              <Route
                path='/colleges/:id/reviews/create'
                element={<ReviewCreateEditListScreen />}
              />
              <Route
                path='/colleges/:id/reviews'
                element={<ReviewListScreen />}
              />
              <Route
                path='/colleges/:id/reviews/:id'
                element={<ReviewScreen />}
              />

              <Route path='/colleges' element={<CollegeListScreen />} />
              <Route
                path='/colleges/create'
                element={<CollegeCreateEditScreen />}
              />
              <Route
                path='/colleges/:id/edit'
                element={<CollegeCreateEditScreen />}
              />
              <Route path='/colleges/:id' element={<CollegeScreen />} />

              <Route path='/dashboard' element={<DashboardScreen />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/*' element={<NotFoundScreen />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
