import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/publicPages/LoginScreen';
import RegisterScreen from './screens/publicPages/RegisterScreen';
import UserEditScreen from './screens/user/UserEditScreen';
import UserScreen from './screens/user/UserScreen';
import UserListScreen from './screens/user/UserListScreen';
import PlanCreateScreen from './screens/plan/PlanCreateScreen';
import PlanEditScreen from './screens/plan/PlanEditScreen';
import PlanScreen from './screens/plan/PlanScreen';
import PlanListScreen from './screens/plan/PlanListScreen';
import ReviewListScreen from './screens/review/ReviewListScreen';
import ReviewScreen from './screens/review/ReviewScreen';
import ReviewCreateScreen from './screens/review/ReviewCreateScreen';
import ReviewEditScreen from './screens/review/ReviewEditScreen';
import CollegeCreateScreen from './screens/college/CollegeCreateScreen';
import CollegeEditScreen from './screens/college/CollegeEditScreen';
import CollegeListScreen from './screens/college/CollegeListScreen';
import CollegeScreen from './screens/college/CollegeScreen';
import HomeScreen from './screens/publicPages/HomeScreen';
import DashboardScreen from './screens/user/DashboardScreen';
import NotFoundScreen from './screens/publicPages/NotFoundScreen';
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
                path='/users'
                element={
                  <PrivateRoute
                    minUserRequirement='reviewer'
                    component={UserListScreen}
                  />
                }
              />
              <Route
                path='/users/:id/edit'
                element={<PrivateRoute component={UserEditScreen} />}
              />
              <Route
                path='/users/:id'
                element={
                  <PrivateRoute
                    minUserRequirement='reviewer'
                    component={UserScreen}
                  />
                }
              />

              <Route
                path='/plans/create'
                element={
                  <PrivateRoute
                    minUserRequirement='admin'
                    component={PlanCreateScreen}
                  />
                }
              />
              <Route
                path='/plans'
                element={<PrivateRoute component={PlanListScreen} />}
              />
              <Route
                path='/plans/:id/edit'
                element={
                  <PrivateRoute
                    minUserRequirement='admin'
                    component={PlanEditScreen}
                  />
                }
              />
              <Route
                path='/plans/:id'
                element={<PrivateRoute component={PlanScreen} />}
              />

              <Route
                path='/colleges/:id/reviews/create'
                element={<PrivateRoute component={ReviewCreateScreen} />}
              />
              <Route
                path='/colleges/:id/reviews'
                element={<PrivateRoute component={ReviewListScreen} />}
              />
              <Route
                path='/colleges/:id/reviews/:reviewId/edit'
                element={<PrivateRoute component={ReviewEditScreen} />}
              />
              <Route
                path='/colleges/:id/reviews/:reviewId'
                element={<PrivateRoute component={ReviewScreen} />}
              />

              <Route
                path='/colleges'
                element={<PrivateRoute component={CollegeListScreen} />}
              />
              <Route
                path='/colleges/create'
                element={<PrivateRoute component={CollegeCreateScreen} />}
              />
              <Route
                path='/colleges/:id/edit'
                element={<PrivateRoute component={CollegeEditScreen} />}
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
