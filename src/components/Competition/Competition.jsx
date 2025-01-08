import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassification, getStats, getGames } from "../../services/StatsApi";
import TableClassification from "./TableClassification";
import TableStats from "./TableStats";
import BarChart from "../Charts/BarChart";

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
  backgroundColor: "#EBD7A5",
  width: "540px",
  height: "100%",
  marginBottom: "20px",
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
  borderRadius: "10px",
};

const tablePartidosStyle = {
  width: "100%",
  backgroundColor: "#4C476B",
  color: "white",
  borderCollapse: "collapse",
  borderRadius: "10px",
};

const tablePartidosThTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  color: "white",
  borderRadius: "10px",
};

export default function Competition() {
  const { competition } = useParams();
  const [classification, setClassification] = useState([]);
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const resp = await getClassification(competition);
        setClassification(Array.isArray(resp.data) ? resp.data : []);
      } catch (error) {
        console.error("Error al cargar la clasificación:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const resp = await getStats(competition);
        setStats(Array.isArray(resp.data) ? resp.data : []);
        console.log(stats);
      } catch (error) {
        console.error("Error al cargar las stats:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchGames = async () => {
      try {
        const resp = await getGames(competition);
        setGames(Array.isArray(resp.data) ? resp.data : []);
      } catch (error) {
        console.error("Error al cargar los partidos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClassification();
    fetchStats();
    fetchGames();
  }, [competition]);

  const proximoPartido = () => {
    const partido = games.find((game) => game.Score === null);
    if (partido) {
      console.log("partido" + partido);
      return `${partido.Home} vs ${partido.Away} - ${partido.Date.split("T")[0]}`;
    }
    return "No hay partidos próximos";
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!classification.length) {
    return <p>No hay datos</p>;
  }

  const dateOfLastUpdate = new Date(classification[0].created_at)
    .toLocaleString()
    .split(",")[0];

  const srcLogo = `/img/${competition}.png`;
  return (
    <div>
      <h2>{competition}</h2>
      <ul>
        <li>
          <a href="#estadisticas">Estadísticas</a>
        </li>
        <li>
          <a href="#charts">Graficos</a>
        </li>
        <li>
          <a href="#games">Partidos</a>
        </li>
      </ul>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <article
          style={{
            float: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#D7263D",
            padding: "10px",
            borderRadius: "10px",
            marginRight: "20px",
            height: "fit-content",
            color: "white",
          }}
        >
          <img
            src={srcLogo}
            alt={competition}
            width="100"
            style={{
              height: "fit-content",
              backgroundColor: "white",
              padding: "5px",
            }}
          />
          <p>Última actualización: {dateOfLastUpdate}</p>
        </article>
        <article
          style={{
            float: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1B998B",
            padding: "10px",
            borderRadius: "10px",
            marginRight: "20px",
            height: "fit-content",
            color: "white",
          }}
        >
          <p><b>Proximo partido: </b><br></br>{proximoPartido()}</p>
        </article>
        </section>
        <TableClassification classification={classification} />
      </div>

      <h1 id="estadisticas">Estadísticas</h1>
      <div style={{ display: "flex" }}>
        <TableStats stats={stats} />
      </div>

      <div id="chart">
        <h1>Charts</h1>
        <section style={sectionChartsStyle}>
          <article style={articleChartStyle}>
            <BarChart
              dataset={classification}
              datasetmap={classification.map((team) => team.Pts)}
              title="Puntos"
            />
          </article>
          <article style={articleChartStyle}>
            <BarChart
              dataset={classification}
              datasetmap={classification.map((team) => team.Attendance)}
              title="Asistencia"
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
      </div>

      <div id="games">
        <h1>Partidos</h1>
        <table style={tablePartidosStyle}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estadio</th>
              <th>Local</th>
              <th>Visitante</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.Home + game.Away}>
                <td style={tablePartidosThTdStyle}>{game.Date.split("T")[0]}</td>
                <td style={tablePartidosThTdStyle}>{game.Venue}</td>
                <td style={tablePartidosThTdStyle}>{game.Home}</td>
                <td style={tablePartidosThTdStyle}>{game.Away}</td>
                <td style={tablePartidosThTdStyle}>{game.Score === null ? "Por jugar" : `${game.Score}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
