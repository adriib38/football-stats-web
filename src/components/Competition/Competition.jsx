import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableClassification from "./TableClassification";
import TableStats from "./TableStats";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CompetitionContext } from "../../context/CompetitionContext";
import Charts from "./Charts";
import Games from "./Games";

export default function Competition() {
  const { competition } = useParams();
  const [matchday, setMatchday] = useState(0);
  const [valueTab, setValueTab] = useState("1");

  const { setCompetition, classification, games, error } =
    useContext(CompetitionContext);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    if (competition) setCompetition(competition);

    const calculateMatchday = () => {
      let matchday = Math.max(...classification.map((c) => c.MP));
      setMatchday(matchday);
    };

    if (classification.length > 0) {
      calculateMatchday();
    }
  }, [classification, competition, setCompetition]);

  document.title = competition;

  const proximoPartido = () => {
    let partidos = games.filter((game) => game.Score === null);
    partidos = partidos.slice(0, 3);

    if (partidos.length === 0) {
      return "No hay.";
    }

    const content = `<strong>Próximos partidos</strong>
      <ul>
          ${partidos
            .map(
              (e) => `<li class="li_vs">${e.Home} Vs. ${e.Away}
          (${new Date(e.Date).toLocaleString().split(",")[0]} 
          -
          ${e.Time.split(":")[0]}:${e.Time.split(":")[1]}h)</li>`
            )
            .join("")}
      </ul>
    `;

    return content;
  };

  const ultimosPartidos = () => {
    let partidos = games.filter((game) => game.Score != null);
    partidos = partidos.reverse().slice(0, 3);

    if (partidos.length === 0) {
      return "No hay.";
    }

    const content = `<strong>Últimos partidos</strong>
      <ul>
        ${partidos
          .map((e) => `<li>${e.Home} ${e.Score} ${e.Away}</li>`)
          .join("")}
    </ul>
  `;

    return content;
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
      </header>

      <div>
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <article
            style={{
              float: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#D7263D",
              padding: "10px 25px",
              borderRadius: "10px",
              height: "fit-content",
              color: "white",
              animation: "slideRight .5s ease-out forwards"
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
              padding: "10px 30px",
              backgroundColor: "#4C476B",
              borderRadius: "10px",
              height: "fit-content",
              color: "white",
              animation: "slideUp .5s ease-out forwards"
            }}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: ultimosPartidos(),
              }}
            ></p>
          </article>
          <article
            style={{
              float: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#1B998B",
              padding: "10px 30px",
              borderRadius: "10px",
              height: "fit-content",
              color: "white",
              animation: "slideUp .5s ease-out forwards"
            }}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: proximoPartido(),
              }}
            ></p>
          </article>
        </section>
        <TabContext value={valueTab}>
          <div sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{ color: "success.main" }}
                label="Clasificación"
                value="1"
              />
              <Tab label="Partidos" value="2" />
              <Tab label="Gráficos" value="3" />
              <Tab label="Estadísticas equipos" value="4" />
            </TabList>
          </div>
          <TabPanel value="1">
            <div id="games">
              <h2>Clasificación</h2>
              <TableClassification />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div id="games">
              <h2>Partidos</h2>
              <Games />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div id="chart">
              <h2>Charts</h2>
              <Charts />
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div id="stats">
              <h2>Estadísticas temporada actual</h2>
              <TableStats />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
