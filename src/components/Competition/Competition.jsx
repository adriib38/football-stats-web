import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassification, getStats, getGames } from "../../services/StatsApi";
import TableClassification from "./TableClassification";
import TableStats from "./TableStats";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CompetitionContext } from "../../context/CompetitionContext";
import Charts from "./Charts";
import Games from "./Games";




export default function Competition() {
  const { competition } = useParams();
  const [matchday, setMatchday] = useState(0);
  const [valueTab, setValueTab] = useState('1');

  const { setCompetition, classification, stats, games, loading, error } = useContext(CompetitionContext);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    if (competition) setCompetition(competition);

    const calculateMatchday = () => {
      let matchday = Math.max(...classification.map((c) => c.MP));
      console.log(matchday);
      setMatchday(matchday);
    };

    if (classification.length > 0) {
      calculateMatchday();
    }
  }, [classification, competition, setCompetition]);

  const proximoPartido = () => {
    const partido = games.find((game) => game.Score === null);
    if (partido) {
      console.log("partido" + partido);
      return `${partido.Home} vs ${partido.Away} - ${
        partido.Date.split("T")[0]
      }`;
    }
    return "No hay partidos próximos";
  };

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
      <header
        style={{
          marginTop: "70px",
          marginBottom: "70px",
          border: "0.5px solid #e7e7e7",
          padding: "25px",
          borderRadius: "7px",
        }}
      >
        <h1>{competition}</h1>
        <p>Matchday: {matchday}</p>
        <ul style={{ display: "flex", gap: "130px" }}>
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
      </header>

      <TabContext value={valueTab}>
        <div sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </div>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>

      <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <section
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
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
                  width: "140px",
                  height: "120px",
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
              <p>
                <b>Proximo partido: </b>
                <br></br>
                {proximoPartido()}
              </p>
            </article>
          </section>
          <TableClassification classification={classification} />
        </div>

        <div>
          <h2>Estadisticas temporada actual</h2>
          <TableStats />
        </div>

        <div id="chart">
          <h2>Charts</h2>
          <Charts />
        </div>

        <div id="games">
          <h2>Partidos</h2>
          <Games />
        </div>
      </div>
    </div>
  );
}
