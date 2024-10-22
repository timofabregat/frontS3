import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import LandingPage from './LandingPage/LandingPage';
//import RoomConfigPage from './RoomConfigPage/RoomCongifPage';
//import DashboardPage from './DashboardPage/DashboardPage';
import QueriesPage from './QueriesPage/QueriesPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueriesPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
