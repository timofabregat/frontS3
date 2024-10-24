import React, { useState } from 'react';
import { LayoutDashboard, Search, Settings, LogOut } from "lucide-react";
import './QueriesPage.css';
import { Link } from 'react-router-dom';

// Mock data for testing
const mockResults = [
  { id: 1, className: 'Room 101', date: '2023-05-01', temperature: 22.5, humidity: 45, co2: 800 },
  { id: 2, className: 'Room 102', date: '2023-05-01', temperature: 23.1, humidity: 48, co2: 750 },
  { id: 3, className: 'Room 101', date: '2023-05-02', temperature: 22.8, humidity: 46, co2: 820 },
  { id: 4, className: 'Room 102', date: '2023-05-02', temperature: 23.5, humidity: 49, co2: 780 },
  { id: 5, className: 'Room 103', date: '2023-05-02', temperature: 21.9, humidity: 44, co2: 790 },
];

export default function QueriesPage() {
  const [classes, setClasses] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(mockResults);

  const handleQuery = (e) => {
    e.preventDefault();
    // Filter mock data based on query parameters
    const filteredResults = mockResults.filter(result =>
      (!classes || result.className.includes(classes)) &&
      (!startDate || result.date >= startDate) &&
      (!endDate || result.date <= endDate)
    );
    setResults(filteredResults);
  };

  return (
    <div className="queries-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">EnviroSense</h1>
        <nav className="nav">
          <a href="./dashboard" className="nav-link">
            <LayoutDashboard size={24} />
          </a>
          <a href="." className="nav-link">
            <Search size={30} />
            <span>Queries</span>
          </a>
          <a href="/config" className="nav-link">
            <Settings size={30} />
            <span>Config</span>
          </a>
        </nav>
        <div className="sign-out">
          <a href="../" className="sign-out-button">
            <LogOut className="icon" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h2 className="page-title">Queries</h2>

        {/* Query Form */}
        <form onSubmit={handleQuery} className="query-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="classes">Classes</label>
              <input
                id="classes"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                className="input"
                placeholder="Room 101, Room 102"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Run Query
          </button>
        </form>

        {/* Results Table */}
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Date</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>CO2 (ppm)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.className}</td>
                  <td>{result.date}</td>
                  <td>{result.temperature}</td>
                  <td>{result.humidity}</td>
                  <td>{result.co2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}