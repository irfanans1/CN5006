import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Hook_ControlledButtonState from './Counter.js'
import WeatherMoodWidgetApp from './WeatherMoodWidgetApp.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Hook_ControlledButtonState />
    <WeatherMoodWidgetApp pic='sunny' />
    <WeatherMoodWidgetApp pic='rainy' />
    <WeatherMoodWidgetApp pic='cloudy' />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

