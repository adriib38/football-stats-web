import { useContext } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";
import styled from "styled-components";

const Table = styled.table`
  border: 10px solid #EBD7A5;
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
    background-color: #EBD7A5;
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
    background-color:rgba(235, 215, 165, 0.33);
  }
`;


export default function Games() {
  const { games } = useContext(CompetitionContext);

  return (
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
        {games.map((game) => (
          <tr key={game.Home + game.Away}>
            <td>{game.Date.split("T")[0]}</td>
            <td>{game.Home}</td>
            <td>{game.Away}</td>
            <td>
              {game.Score === null ? "Por jugar" : `${game.Score}`}
            </td>
            <td>{game.Venue}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
