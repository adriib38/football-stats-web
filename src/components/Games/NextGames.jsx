import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Dot from "../../utils/Dot";

const API_BASE_URL = "https://seal-app-myhre.ondigitalocean.app /g";

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

export default function NextGames() {
  const [nextGames, setNextGames] = useState([]); // Estado para almacenar los juegos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener los próximos juegos
  const getNextGames = async () => {
    const url = `${API_BASE_URL}/nextgames`;
    try {
      const resp = await fetch(url, {
        method: "GET",
        credentials: "include", // Para manejar cookies o sesión si es necesario
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        // Verifica si la respuesta es exitosa
        throw new Error("Error en la respuesta de la API");
      }

      const data = await resp.json();
      setNextGames(data); // Almacena los datos obtenidos en el estado
    } catch (err) {
      setError(err.message); // Si hay un error, lo almacenamos
    } finally {
      setLoading(false); // Al finalizar la carga, ponemos loading en false
    }
  };

  useEffect(() => {
    getNextGames(); // Llama a la API cuando el componente se monta
  }, []); // El arreglo vacío asegura que solo se llame una vez al montar

  if (loading) {
    return <p>Cargando los próximos juegos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const gameToday = (gameDate) => {
    const dateNow = new Date().toLocaleString().split(",")[0];
    return gameDate === dateNow;
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Local</th>
          <th>Visitante</th>
          <th>Estadio</th>
        </tr>
      </thead>
      <tbody>
        {nextGames.slice(0, 9).map((game) => (
          <tr key={game.Home + game.Away + game.Time}>
            <td>
              {gameToday(new Date(game.Date).toLocaleString().split(",")[0]) ? (
                <Dot />
              ) : (
                ""
              )}
              {new Date(game.Date).toLocaleString().split(",")[0]} -{" "}
              {game.Time.split(":")[0]}:{game.Time.split(":")[1]}h
            </td>
            <td>
              <a
                href={`/t/${game.Home}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {game.Home}
              </a>
            </td>
            <td>
              {" "}
              <a
                href={`/t/${game.Away}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {game.Away}
              </a>
            </td>
            <td>{game.Venue}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
