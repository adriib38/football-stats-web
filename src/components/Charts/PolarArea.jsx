import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PolarAreaController,
  RadialLinearScale
} from "chart.js";

ChartJS.register(PolarAreaController, ArcElement, Title, Tooltip, Legend, RadialLinearScale);

export default function PolarAreaChart({ dataset, title, datasetmap }) {
  datasetmap = datasetmap.map((value) => parseInt(value));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels: dataset.map((team) => team.Squad),
    datasets: [
      {
        label: false,
        data: datasetmap,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <PolarArea
      data={data}
      options={options}
    />
  );
}
