import React, { useState } from 'react';
import { ArrowRight, Thermometer, Droplets, Wind } from "lucide-react";
import './LandingPage.css';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="landing-page">
      <header>
        <h1>EnviroSense</h1>
      </header>

      <main>
        <div className="content">
          <h2 className="animate-fade-in-up">
            Bienvenido a EnviroSense
          </h2>
          <p className="animate-fade-in-up animation-delay-200">
            Monitoreo en real-time de temperatura, humedad, y niveles de CO2 en tus ambientes.
          </p>
          <div className="icons">
            <div className="icon-group animate-float">
              <Thermometer size={48} className="icon" />
              <span>Temperatura</span>
            </div>
            <div className="icon-group animate-float animation-delay-200">
              <Droplets size={48} className="icon" />
              <span>Humedad</span>
            </div>
            <div className="icon-group animate-float animation-delay-400">
              <Wind size={48} className="icon" />
              <span>Nivel CO2</span>
            </div>
          </div>
        </div>
        <a href="/auth/dash">
          <button
            className={`login-button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Inicia sesión para comenzar</span>
            <ArrowRight className={`arrow ${isHovered ? 'translate' : ''}`} />
          </button>
        </a>
      </main>

      <footer>
        <p>&copy; 2024 EnviroSense Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}