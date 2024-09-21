import React, { useState } from 'react';

const ProblemInput = ({ onSubmit }) => {
  const [problems, setProblems] = useState('');

  const handleInputChange = (e) => {
    setProblems(e.target.value);
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    onSubmit(today, problems); // Pass the number of problems solved and the date to the parent function
    setProblems(''); // Clear the input field after submission
  };

  return (
    <div className="problem-input">
      <input
        type="number"
        value={problems}
        placeholder="Problems solved"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProblemInput;
