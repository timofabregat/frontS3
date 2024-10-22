import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Search, Settings, LogOut, Save, Users } from "lucide-react";
import './RoomConfigPage.css';

const users = [
  { id: "alice", name: "Alice Johnson" },
  { id: "bob", name: "Bob Smith" },
  { id: "carol", name: "Carol Williams" },
  { id: "dave", name: "Dave Brown" },
  { id: "eve", name: "Eve Davis" },
];

function LimitSetting({ title, value, onChange, min, max }) {
  const handleDrag = (e) => {
    e.preventDefault();
    const slider = e.currentTarget.parentElement;
    if (!slider) return;

    const handleMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      const newPosition = (moveEvent.clientX - rect.left) / rect.width;
      const newValue = Math.round(min + newPosition * (max - min));
      onChange(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const position = Math.min(((value - min) / (max - min)) * 100, 100);

  return (
    <div className="limit-setting">
      <label className="label">{title}</label>
      <div className="slider-container">
        <div className="slider-track" />
        <div className="slider-fill" style={{ right: `${100 - position}%` }} />
        <button
          className="slider-handle"
          style={{ left: `${position}%` }}
          onMouseDown={handleDrag}
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="input"
        />
      </div>
    </div>
  );
}

export default function Component() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [limits, setLimits] = useState({
    temperature: 26,
    humidity: 60,
    co2: 1000
  });
  const [subscribers, setSubscribers] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch('https://aedsh5bqth.execute-api.us-east-2.amazonaws.com/default/front-lamda');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRooms(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (selectedRoom) {
      const room = rooms.find(r => r.ID === selectedRoom);
      if (room) {
        setLimits({
          temperature: parseInt(room.LimiteTemp),
          humidity: parseInt(room.LimiteHum),
          co2: parseInt(room.LimiteCO2)
        });
      }
    }
  }, [selectedRoom, rooms]);

  const handleLimitChange = (measurement, value) => {
    setLimits(prev => ({
      ...prev,
      [measurement]: value
    }));
  };

  const handleSubscriberToggle = (userId) => {
    setSubscribers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = async () => {
    if (!selectedRoom) {
      setSaveMessage('Please select a room before saving.');
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch('https://82ke0mhqz3.execute-api.us-east-2.amazonaws.com/default/front-lamda-update-room', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedRoom,
          LimiteTemp: limits.temperature,
          LimiteHum: limits.humidity,
          LimiteCO2: limits.co2
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update room limits: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Server response:', data);
      setSaveMessage('Room limits updated successfully.');

      // Fetch updated room data after successful save
      await fetchRooms();
    } catch (error) {
      console.error('Error updating room limits:', error);
      setSaveMessage(`Failed to update room limits: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="room-config-page">
      <aside className="sidebar">
        <h1 className="logo">EnviroSense</h1>
        <nav className="nav">
          <a href="../auth/dash" className="nav-link">
            <LayoutDashboard size={24} />
            <span>Dashboard</span>
          </a>
          <a href="../auth/query" className="nav-link">
            <Search size={30} />
            <span>Queries</span>
          </a>
          <a href="." className="nav-link">
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

      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="page-title">Room Configuration</h2>

          <div className="card">
            <h3 className="card-title">Select Room</h3>
            <select
              className="select"
              onChange={(e) => setSelectedRoom(Number(e.target.value))}
              value={selectedRoom || ''}
            >
              <option value="">Select a room</option>
              {rooms.map(room => (
                <option key={room.ID} value={room.ID}>Room {room.ID}</option>
              ))}
            </select>
          </div>

          {selectedRoom && (
            <div className="card">
              <h3 className="card-title">
                Measurement Limits for Room {selectedRoom}
              </h3>
              <div className="card-content">
                <LimitSetting
                  title="Temperature (°C)"
                  value={limits.temperature}
                  onChange={(value) => handleLimitChange('temperature', value)}
                  min={0}
                  max={50}
                />
                <LimitSetting
                  title="Humidity (%)"
                  value={limits.humidity}
                  onChange={(value) => handleLimitChange('humidity', value)}
                  min={0}
                  max={100}
                />
                <LimitSetting
                  title="CO2 (ppm)"
                  value={limits.co2}
                  onChange={(value) => handleLimitChange('co2', value)}
                  min={0}
                  max={5000}
                />
                <div className="subscribers">
                  <label className="label">Subscribers</label>
                  <button className="button" onClick={() => setIsSheetOpen(true)}>
                    <Users className="icon" />
                    Manage Subscribers
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedRoom && (
            <button onClick={handleSave} className="save-button" disabled={isSaving}>
              <Save className="icon" /> {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          )}

          {saveMessage && (
            <div className={`save-message ${saveMessage.includes('successfully') ? 'success' : 'error'}`}>
              {saveMessage}
            </div>
          )}
        </div>
      </main>

      {isSheetOpen && (
        <div className="sheet">
          <div className="sheet-content">
            <h3 className="sheet-title">Select Subscribers</h3>
            <div className="subscribers-list">
              {users.map((user) => (
                <div key={user.id} className="subscriber-item">
                  <input
                    type="checkbox"
                    id={user.id}
                    checked={subscribers.includes(user.id)}
                    onChange={() => handleSubscriberToggle(user.id)}
                  />
                  <label htmlFor={user.id}>{user.name}</label>
                </div>
              ))}
            </div>
            <button className="close-sheet" onClick={() => setIsSheetOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}