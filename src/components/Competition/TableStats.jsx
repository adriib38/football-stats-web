import styled from "styled-components";
import { useContext } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";

export default function TableStats() {
  const { stats } = useContext(CompetitionContext);

  const downloadStatsCsv = () => {
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(stats[0]);
    let csv = stats.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "stats.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const Table = styled.table`
    border: 10px solid #4C476B;
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
      background-color: #4C476B;
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
      background-color:rgba(76, 71, 107, 0.25);
    }
  `;

  return (
    <Table>
      <thead>
        <tr>
          <th>Equipo</th>
          <th>Jugadores</th>
          <th>Edad</th>
          <th>% pases</th>
          <th>PJ</th>
          <th>Starts</th>
          <th>Min</th>
          <th>90s</th>
          <th>Gls</th>
          <th>Ast</th>
          <th>G+A</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((team, index) => (
          <tr key={index}>
            <td>{team.Squad}</td>
            <td>{team.Pl}</td>
            <td>{team.Age}</td>
            <td>{team.Poss}</td>
            <td>{team.MP}</td>
            <td>{team.Starts}</td>
            <td>{team.Min}</td>
            <td>{team["90s"]}</td>
            <td>{team.Gls}</td>
            <td>{team.Ast}</td>
            <td>{team["G_plus_A"]}</td>
          </tr>
        ))}
      </tbody>
      {/* <botton onClick={downloadStatsCsv}>Download</botton> */}
    </Table>
  );
}
