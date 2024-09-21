import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ problemsSolved, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Utility function to get the number of days in a month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month to align days correctly
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const renderDays = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth(month, year); i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Actual days in the month
    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const date = `${year}-${month + 1}-${day}`;
      const isCompleted = problemsSolved[date];
      days.push(
        <div
          key={day}
          className={`day ${isCompleted ? 'completed' : ''}`}
          onClick={() => onDayClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div className="month-name">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days-grid">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
