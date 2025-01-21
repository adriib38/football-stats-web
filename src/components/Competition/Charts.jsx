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

  const safeClassification = Array.isArray(classification) ? classification : [];
  const safeStats = Array.isArray(stats) ? stats : [];

  return (
    <section style={sectionChartsStyle}>
      <article style={articleChartStyle}>
        <BarChart
          dataset={safeClassification}
          datasetmap={safeClassification.map((team) => team.Pts)}
          title="Puntos"
        />
      </article>
      <article style={articleChartStyle}>
        <DoughnutChart
          dataset={safeClassification}
          datasetmap={safeClassification.map((team) => team.xGD)}
          title="xGD"
        />
      </article>
      <article style={articleChartStyle}>
        <BarChart
          dataset={safeStats}
          datasetmap={safeStats.map((team) => team.Age)}
          title="Media edad"
        />
      </article>
      <article style={articleChartStyle}>
        <BarChart
          dataset={safeClassification}
          datasetmap={safeClassification.map((team) => team.GF)}
          title="Goles a favor"
        />
      </article>
    </section>
  );


}
