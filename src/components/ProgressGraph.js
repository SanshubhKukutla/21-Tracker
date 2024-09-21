import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ProgressGraph = ({ problemsSolved }) => {
  // Extract the data for the chart
  const dates = Object.keys(problemsSolved).sort(); // Sorted dates
  const problemData = dates.map(date => problemsSolved[date].problems || 0); // Get the number of problems solved per date

  const data = {
    labels: dates, // Dates
    datasets: [
      {
        label: 'Problems Solved',
        data: problemData,
        fill: false,
        borderColor: '#4caf50',
        backgroundColor: '#4caf50',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ffffff' },
        grid: { color: '#444' },
      },
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#444' },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ffffff', // For dark theme
        },
      },
    },
  };

  return (
    <div className="progress-graph">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressGraph;


