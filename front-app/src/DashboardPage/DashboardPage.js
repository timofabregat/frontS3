import React, { useState } from 'react';
import { LayoutDashboard, Search, Settings, LogOut, Thermometer, Droplets, Wind } from "lucide-react";
import './DashboardPage.css';

// Expanded test data
const classData = [
  { id: 1, name: 'Room 101', temperature: 35, humidity: 45, co2: 800 },
  { id: 2, name: 'Room 102', temperature: 23.1, humidity: 48, co2: 750 },
  { id: 3, name: 'Room 103', temperature: 21.8, humidity: 42, co2: 820 },
  { id: 4, name: 'Room 104', temperature: 24.2, humidity: 50, co2: 780 },
  { id: 5, name: 'Room 105', temperature: 22.7, humidity: 46, co2: 810 },
  { id: 6, name: 'Room 106', temperature: 23.5, humidity: 47, co2: 790 },
  { id: 7, name: 'Room 107', temperature: 22.0, humidity: 44, co2: 830 },
  { id: 8, name: 'Room 108', temperature: 24.5, humidity: 51, co2: 770 },
  { id: 9, name: 'Room 201', temperature: 23.2, humidity: 49, co2: 795 },
  { id: 10, name: 'Room 202', temperature: 22.9, humidity: 47, co2: 805 },
  { id: 11, name: 'Room 203', temperature: 23.7, humidity: 52, co2: 760 },
  { id: 12, name: 'Room 204', temperature: 21.5, humidity: 43, co2: 840 },
  { id: 13, name: 'Room 205', temperature: 24.0, humidity: 48, co2: 785 },
  { id: 14, name: 'Room 206', temperature: 22.3, humidity: 45, co2: 815 },
  { id: 15, name: 'Room 207', temperature: 23.9, humidity: 50, co2: 775 },
  { id: 16, name: 'Room 208', temperature: 22.6, humidity: 46, co2: 825 },
  { id: 17, name: 'Room 301', temperature: 23.3, humidity: 49, co2: 790 },
  { id: 18, name: 'Room 302', temperature: 22.8, humidity: 47, co2: 810 },
  { id: 19, name: 'Room 303', temperature: 24.1, humidity: 51, co2: 765 },
  { id: 20, name: 'Room 304', temperature: 21.7, humidity: 44, co2: 835 },
  { id: 21, name: 'Room 305', temperature: 23.6, humidity: 48, co2: 795 },
  { id: 22, name: 'Room 306', temperature: 22.4, humidity: 45, co2: 820 },
  { id: 23, name: 'Room 307', temperature: 24.3, humidity: 50, co2: 780 },
  { id: 24, name: 'Room 308', temperature: 23.0, humidity: 47, co2: 805 },
  { id: 25, name: 'Room 401', temperature: 22.8, humidity: 46, co2: 815 },
  { id: 26, name: 'Room 402', temperature: 23.4, humidity: 49, co2: 785 },
  { id: 27, name: 'Room 403', temperature: 24.2, humidity: 51, co2: 770 },
  { id: 28, name: 'Room 404', temperature: 21.9, humidity: 44, co2: 830 },
  { id: 29, name: 'Room 405', temperature: 23.8, humidity: 50, co2: 790 },
  { id: 30, name: 'Room 406', temperature: 22.5, humidity: 45, co2: 810 },
];

function NavLink({ href, icon, children }) {
  return (
    <a href={href} className="nav-link">
      {icon}
      <span>{children}</span>
    </a>
  );
}

function MetricCard({ title, value, icon, color }) {
  return (
    <div className={`metric-card ${color}`}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {icon}
      </div>
      <p className="metric-value">{value}</p>
    </div>
  );
}

function getTemperatureColor(temp) {
  if (temp < 18) return 'text-blue-300';
  if (temp > 26) return 'text-red-300';
  return 'text-green-300';
}

function getHumidityColor(humidity) {
  if (humidity < 30) return 'text-yellow-300';
  if (humidity > 60) return 'text-blue-300';
  return 'text-green-300';
}

function getCO2Color(co2) {
  if (co2 < 600) return 'text-green-300';
  if (co2 > 1000) return 'text-red-300';
  return 'text-yellow-300';
}

export default function DashboardPage() {
  const [activeRoom, setActiveRoom] = useState(0);

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    const roomHeight = 200; // Approximate height of each room card
    const newActiveRoom = Math.floor(scrollTop / roomHeight);
    setActiveRoom(newActiveRoom);
  };

  const scrollToRoom = (index) => {
    const scrollContainer = document.getElementById('room-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: index * 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1 className="logo">EnviroSense</h1>
        <nav className="nav">
          <NavLink href="" icon={<LayoutDashboard size={24} />}>
            Dashboard
          </NavLink>
          <NavLink href="../auth/query" icon={<Search size={30} />}>
            Queries
          </NavLink>
          <NavLink href="../auth/config" icon={<Settings size={30} />}>
            Config
          </NavLink>
        </nav>
        <div className="sign-out">
          <a href="../" className="sign-out-button">
            <LogOut className="icon" />
            Sign Out
          </a>
        </div>
      </aside>

      <main className="main-content">
        <h2 className="page-title">Dashboard</h2>

        <div
          id="room-scroll-container"
          className="room-scroll-area"
          onScroll={handleScroll}
        >
          {classData.map((room) => (
            <div key={room.id} className="room-card">
              <h3 className="room-title">{room.name}</h3>
              <div className="metrics-grid">
                <MetricCard
                  title="Temperature"
                  value={`${room.temperature}°C`}
                  icon={<Thermometer className="icon" />}
                  color={getTemperatureColor(room.temperature)}
                />
                <MetricCard
                  title="Humidity"
                  value={`${room.humidity}%`}
                  icon={<Droplets className="icon" />}
                  color={getHumidityColor(room.humidity)}
                />
                <MetricCard
                  title="CO2"
                  value={`${room.co2} ppm`}
                  icon={<Wind className="icon" />}
                  color={getCO2Color(room.co2)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="room-indicators">
          {classData.map((room, index) => (
            <button
              key={room.id}
              onClick={() => scrollToRoom(index)}
              className={`room-indicator ${index === activeRoom ? 'active' : ''}`}
              title={room.name}
            />
          ))}
        </div>
      </main>
    </div>
  );
}