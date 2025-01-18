import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/PolarArea";

import { useEffect, useState, useContext } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";

const sectionChartsStyle = {
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "#1B998B",
  padding: "10px",
  borderRadius: "10px",
  color: "white",
  justifyContent: "center",
  gap: "10px",
};

const articleChartStyle = {
  backgroundColor: "#fff",
  width: "850px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "10px",
};

export default function Charts() {
  const { classification, stats, loading, error } = useContext(CompetitionContext);

  return (
    <section style={sectionChartsStyle}>
      <article style={articleChartStyle}>
        <BarChart
          dataset={classification}
          datasetmap={classification.map((team) => team.Pts)}
          title="Puntos"
        />
      </article>
      <article style={articleChartStyle}>
        <DoughnutChart
          dataset={classification}
          datasetmap={classification.map((team) => team.xGD)}
          title="xGD"
        />
      </article>
      <article style={articleChartStyle}>
        <BarChart
          dataset={stats}
          datasetmap={stats.map((team) => team.Age)}
          title="Media edad"
        />
      </article>
      <article style={articleChartStyle}>
        <BarChart
          dataset={classification}
          datasetmap={classification.map((team) => team.GF)}
          title="Goles a favor"
        />
      </article>
    </section>
  );
}
