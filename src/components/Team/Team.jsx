import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import colorsTeams from "../../utils/colorsTeams";
import { TeamContext } from "../../context/TeamContext.jsx";
import Dot from "../../utils/Dot.jsx";

export default function Team() {
  const { team: teamParam } = useParams();

  const { teamData, loading, setTeam, teamGames, notFound } =
    useContext(TeamContext);
  const [gameDay, setGameday] = useState(null);

  useEffect(() => {
    if (teamParam) setTeam(teamParam);
  }, [teamParam, setTeam]);

  useEffect(() => {
    const fgameDay = () => {
      const today = new Date();
      let found = null;

      teamGames.forEach((tg) => {
        const gameDateUTC = new Date(tg.Date);
        const localGameDate = new Date(
          gameDateUTC.getFullYear(),
          gameDateUTC.getMonth(),
          gameDateUTC.getDate()
        );
        // console.log("Buscando para " + gameDateUTC.getDate() +":"+ gameDateUTC.getMonth() +":"+ gameDateUTC.getFullYear())

        if (
          localGameDate.getFullYear() === today.getFullYear() &&
          localGameDate.getMonth()  === today.getMonth() &&
          localGameDate.getDate() === today.getDate()
        ) {
          // console.log("Partido para " + today.getDate() + today.getMonth() + today.getFullYear() + ":" + localGameDate.getDate() + localGameDate.getMonth()  + localGameDate.getFullYear())
          found = tg;
        }
      });

      if (found) {
        // console.log("Partido para " + today.getDate() + today.getMonth() + today.getFullYear() + ": " + localGameDate.getDate() + localGameDate.getMonth() + localGameDate.getFullYear())
        console.log(found.Home + found.Away)
        setGameday(found);
      } else {
        console.log("No hay partido para " + today.getDate() +":"+ today.getMonth() +":"+ today.getFullYear())

        setGameday(null);
      }
    };

    if (teamGames.length > 0) {
      fgameDay();
    }
  }, [teamGames]);

  document.title = teamParam;

  const gameToday = (gameDate) => {
    const dateNow = new Date().toLocaleString().split(",")[0];
    return gameDate === dateNow;
  };

  const colorsTeam = colorsTeams.find((ct) => ct.name === teamData.Squad)
    ?.colors || ["#CCCCCC", "#DDDDDD"];
  const getTeamColors = (teamName) => {
    const colorsTeam = colorsTeams.find((ct) => ct.name === teamName)
      ?.colors || ["#CCCCCC", "#DDDDDD"];
    return colorsTeam;
  };

  const Table = styled.table`
    border: 10px solid #ebd7a5;
    border-radius: 20px;
    border-collapse: separate;
    width: 100%;
    background: #f7f7f7;
    color: rgb(32, 32, 32);
    font-size: 1.2em;
    margin: 0 auto;
    margin-bottom: 20px;

    thead {
      color: white;
      background-color: #ebd7a5;
    }

    th,
    td {
      padding: 8px;
      text-align: center;
    }

    td {
      padding: 12px;
      border-bottom: 5px solid white;
    }

    tr:last-child td {
      border-bottom: none;
    }

    thead tr:first-child th {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }

    tbody tr:last-child td:first-child {
      border-bottom-left-radius: 20px;
    }

    tbody tr:last-child td:last-child {
      border-bottom-right-radius: 20px;
    }

    tr:hover {
      background-color: rgba(235, 215, 165, 0.33);
    }
  `;

  if (notFound) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Equipo no encontrado</p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          margin: "5px",
          border: "2px #dad4e9 solid",
          borderRadius: "6px",
          position: "relative",
          height: "200px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "10%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            marginRight: "30px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: colorsTeam[0],
            }}
          ></div>

          <div
            style={{
              width: "100%",
              height: "100%",
              background: colorsTeam[1],
            }}
          ></div>
        </div>
        <div style={{ padding: "30px" }}>
          <h1
            style={{
              position: "relative",
              color: "black",
              zIndex: 1,
            }}
          >
            {teamData.Squad}
          </h1>
          <h2>
            <p>
              {loading ? "Cargando..." : `${teamData.Rk}º ${teamData.league}`}
            </p>
          </h2>
          <footer style={{ position: "absolute", bottom: "10px" }}>
            <p>
              🏟️ {teamData.Last_5} - ⚽ {teamData.Top_Team_Scorer}
            </p>
          </footer>
        </div>
      </div>

      {gameDay && (
        <article
          style={{
            position: "relative",
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            textAlign: "center",
            width: "30%",
            margin: "0 auto",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "RumbleBrave",
                fontWeight: "initial",
                fontsize: "30px",
              }}
            >
              Matchday
            </h2>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                padding: "14px 5px",
              }}
            >
              {gameDay.Home} Vs. {gameDay.Away}
            </p>
            <p style={{fontStyle: "italic"}}>
              {gameDay.Venue} {gameDay.Time}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "5%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              marginLeft: "30px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: getTeamColors(gameDay.Home)[0],
              }}
            ></div>

            <div
              style={{
                width: "100%",
                height: "100%",
                background: getTeamColors(gameDay.Home)[1],
              }}
            ></div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "5%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              marginRight: "30px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: getTeamColors(gameDay.Away)[0],
              }}
            ></div>

            <div
              style={{
                width: "100%",
                height: "100%",
                background: getTeamColors(gameDay.Away)[1],
              }}
            ></div>
          </div>
        </article>
      )}
      <div style={{ marginTop: "40px" }}>
        <h2>Partidos del equipo en {teamData.league}</h2>
        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Local</th>
              <th>Visitante</th>
              <th>Resultado</th>
              <th>Estadio</th>
            </tr>
          </thead>
          <tbody>
            {teamGames
              .slice(0)
              .reverse()
              .map((g) => (
                <tr key={g.Home + g.Away}>
                  <td>
                    {gameToday(
                      new Date(g.Date).toLocaleString().split(",")[0]
                    ) ? (
                      <Dot />
                    ) : (
                      ""
                    )}
                    {new Date(g.Date).toLocaleString().split(",")[0]} -{" "}
                    {g.Time.split(":")[0]}:{g.Time.split(":")[1]}h
                  </td>
                  <td>
                    {g.Home === teamData.Squad ? (
                      <strong>{g.Home}</strong>
                    ) : (
                      g.Home
                    )}
                  </td>
                  <td>
                    {g.Away === teamData.Squad ? (
                      <strong>{g.Away}</strong>
                    ) : (
                      g.Away
                    )}
                  </td>
                  <td>{g.Score === null ? "Por jugar" : `${g.Score}`}</td>
                  <td>{g.Venue}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
