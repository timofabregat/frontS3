import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';
import LandingPage from './LandingPage/LandingPage';
import RoomConfigPage from './RoomConfigPage/RoomCongifPage'
import QueriesPage from './QueriesPage/QueriesPage'

function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/config' element={<RoomConfigPage/>}/>
        <Route path='/query' element={<QueriesPage />} />
      </Routes>

    </div>
  );
  
}

export default App;