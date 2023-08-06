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
import PrivateRoute from './components/PrivateRoute';

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
      x: mousePosition.x - 250,
      y: mousePosition.y - 250,
    },
  };

  return (
    <Router>
      <div className='bg-[#181829] text-white font-sans'>
        <motion.div
          className='w-[500px] h-[500px] rounded-full fixed left-0 top-0 z-10 bg-gradient-to-br to-[#647dee] from-[#7f53ac]'
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

              <Route
                path='/users/:id/edit'
                element={<PrivateRoute component={UserEditScreen} />}
              />
              <Route
                path='/users'
                element={<PrivateRoute component={UserListScreen} />}
              />
              <Route
                path='/users/:id'
                element={<PrivateRoute component={UserScreen} />}
              />

              <Route
                path='/plans/create'
                element={<PrivateRoute component={PlanCreateEditScreen} />}
              />
              <Route
                path='/plans/:id/edit'
                element={<PrivateRoute component={PlanCreateEditScreen} />}
              />
              <Route
                path='/plans'
                element={<PrivateRoute component={PlanListScreen} />}
              />
              <Route
                path='/plans/:id'
                element={<PrivateRoute component={PlanScreen} />}
              />

              <Route
                path='/colleges/:id/reviews/:id/edit'
                element={
                  <PrivateRoute component={ReviewCreateEditListScreen} />
                }
              />
              <Route
                path='/colleges/:id/reviews/create'
                element={
                  <PrivateRoute component={ReviewCreateEditListScreen} />
                }
              />
              <Route
                path='/colleges/:id/reviews'
                element={<PrivateRoute component={ReviewListScreen} />}
              />
              <Route
                path='/colleges/:id/reviews/:id'
                element={<PrivateRoute component={ReviewScreen} />}
              />

              <Route
                path='/colleges'
                element={<PrivateRoute component={CollegeListScreen} />}
              />
              <Route
                path='/colleges/create'
                element={<PrivateRoute component={CollegeCreateEditScreen} />}
              />
              <Route
                path='/colleges/:id/edit'
                element={<PrivateRoute component={CollegeCreateEditScreen} />}
              />
              <Route
                path='/colleges/:id'
                element={<PrivateRoute component={CollegeScreen} />}
              />

              <Route
                path='/dashboard'
                element={<PrivateRoute component={DashboardScreen} />}
              />
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
