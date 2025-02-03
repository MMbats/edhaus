import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartWidget = ({ 
  title, 
  data, 
  labels, 
  type = 'line',
  colors = ['rgb(75, 192, 192)'],
  showLegend = true,
  height = '64',
  yAxisLabel = '',
  xAxisLabel = '',
  options = {} 
}) => {
  const chartData = {
    labels,
    datasets: Array.isArray(data[0]) 
      ? data.map((dataset, index) => ({
          label: dataset.label || `Dataset ${index + 1}`,
          data: dataset.values,
          fill: false,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
          tension: 0.1
        }))
      : [{
          label: title,
          data,
          fill: false,
          borderColor: colors[0],
          backgroundColor: colors[0],
          tension: 0.1
        }]
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: showLegend,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-KE', {
                style: 'currency',
                currency: 'KES'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel
        },
        ticks: {
          callback: function(value) {
            return 'KES ' + value.toLocaleString();
          }
        }
      },
      x: {
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    ...options
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className={`h-${height}`}>
        <ChartComponent data={chartData} options={defaultOptions} />
      </div>
    </div>
  );
};

export default ChartWidget;