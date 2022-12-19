import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({data}) => {
    return (
        <Bar data={data} options={{ maintainAspectRatio: false, scales: {x: {grid: {lineWidth: 0}}}, y: {grid: {offset: false}}, responsive: true  }} />
    )
}

export default BarChart;