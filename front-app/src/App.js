import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://aedsh5bqth.execute-api.us-east-2.amazonaws.com/default/front-lamda')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data); // Log the API response
        if (data && Array.isArray(data.data)) {
          setRooms(data.data); // Set the 'data' array to rooms
        } else {
          console.error('API did not return an array in the expected format');
        }
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* Display loading message */}
        {loading ? (
          <p>Loading rooms data...</p>
        ) : (
          <div>
            <h2>Room Data:</h2>
            <ul>
              {/* Render room data only if rooms is an array */}
              {rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <li key={index}>
                    Room ID: {room.ID}, Temp Limit: {room.LimiteTemp}, Humidity Limit: {room.LimiteHum}, CO2 Limit: {room.LimiteCO2}
                  </li>
                ))
              ) : (
                <p>No room data available</p> // Handle case where there's no data
              )}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;