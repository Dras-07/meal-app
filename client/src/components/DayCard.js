import React from 'react';
import './styles/daycard.css';
const DayCard = ({ day, color }) => {
  return (
    <div className="day-card" style={{ backgroundColor: color }}>
      <h3>{day}</h3>
     
    </div>
  );
};

export default DayCard;
