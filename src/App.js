import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Bookings from './components/Bookings/Bookings';
import ClientInfo from './components/ClientInfo/ClientInfo';
import Home from './components/Home/Home';
import Mechanic from './components/Mechanic/Mechanic';
import Mechanics from './components/Mechanics/Mechanics';
import NotFound from './components/Shared/NotFound/NotFound';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import AuthProvider from './context/AuthProvider';
import logo from './images/logo.svg';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const renderLoader = () =>
    <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
      <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Raufu Automotive" />
      <p className='text-center'>Loading...</p>
    </div>

  return (
    <AuthProvider>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='mechanics' element={<Mechanics />} />
          <Route path='mechanic/:id' element={<Mechanic />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route path='/' element={<PrivateOutlet />}>
            <Route path='bookings' element={<Bookings />} />
            <Route path='clientInfo' element={<ClientInfo />} />
            <Route path='profile' element={<Profile />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
