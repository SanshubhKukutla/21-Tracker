import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import ProblemInput from './components/ProblemInput';
import ProgressGraph from './components/ProgressGraph';
import { saveToLocalStorage, getFromLocalStorage } from './utils/storage';
import './App.css';

function App() {
  const [problemsSolved, setProblemsSolved] = useState(getFromLocalStorage('problemsSolved') || {});
  const [dailyCount, setDailyCount] = useState(getFromLocalStorage('dailyCount') || 1);
  const [streak, setStreak] = useState(getFromLocalStorage('streak') || 0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Save data to LocalStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage('problemsSolved', problemsSolved);
    saveToLocalStorage('dailyCount', dailyCount);
    saveToLocalStorage('streak', streak);
  }, [problemsSolved, dailyCount, streak]);

  const calculateStreak = (updatedProblems) => {
    const completedDays = Object.keys(updatedProblems).filter(day => updatedProblems[day].completed).length;
    return completedDays;
  };

  const markDay = (date, problems) => {
    const isCompleted = !!problemsSolved[date]?.completed; // Toggle based on current status
    const updatedProblems = {
      ...problemsSolved,
      [date]: { completed: !isCompleted, problems: !isCompleted ? problems : 0 },
    };

    setProblemsSolved(updatedProblems);
    const currentStreak = calculateStreak(updatedProblems);
    setStreak(currentStreak);

    // Check if the user reached a 21-day streak
    if (currentStreak > 0 && currentStreak % 21 === 0) {
      setShowPrompt(true); // Show prompt after 21 days
    }

    setSelectedDay(date); // Show which day is selected
  };

  const handleIncreaseGoal = () => {
    setDailyCount(dailyCount + 1);
    setShowPrompt(false); // Hide prompt after accepting
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false); // Hide prompt without increasing goal
  };

  return (
    <div className="App">
      <h1>LeetCode Habit Tracker</h1>
      <h2>Current Streak: {streak} days</h2>
      <h2>Problems per Day: {dailyCount}</h2>
      <h3>Selected Day: {selectedDay || 'None'}</h3>
      <h4>Problems solved: {problemsSolved[selectedDay]?.problems || 0}</h4>
      <Calendar problemsSolved={problemsSolved} onDayClick={markDay} />
      <ProblemInput onSubmit={markDay} />
      
      {/* Progress Graph */}
      <ProgressGraph problemsSolved={problemsSolved} />

      {/* Prompt after 21-day streak */}
      {showPrompt && (
        <div className="prompt">
          <p>You've completed 21 days in a row! Would you like to increase your daily problem goal?</p>
          <button onClick={handleIncreaseGoal}>Yes, increase my goal!</button>
          <button onClick={handleDismissPrompt}>No, keep it the same.</button>
        </div>
      )}
    </div>
  );
}

export default App;
