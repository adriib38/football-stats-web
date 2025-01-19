import styled from "styled-components";
import { useContext } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";

export default function TableClassification() {
  const { classification } = useContext(CompetitionContext);

  const downloadStatsCsv = () => {
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(classification[0]);
    let csv = classification.map((row) =>
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
  };

  const Table = styled.table`
    border: 10px solid #1b998b;
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
      background-color: #1b998b;
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

    .top-four {
      background: #5ca7f78c;
    }

    .five-seven {
      background:rgba(247, 206, 92, 0.55);
    }

    .last-three {
      background:rgba(247, 92, 92, 0.55);
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
      background-color: rgba(27, 153, 138, 0.13);
    }
  `;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>V</th>
            <th>D</th>
            <th>P</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
            <th>Goleador</th>
            <th>Portero</th>
          </tr>
        </thead>
        <tbody>
      
          {classification.map((team, index) => {
            const rowClass = 
              index < 4 ? "top-four" : 
              index < 7 ? "five-seven" : 
              index > (classification.length - 4) ? "last-three" :  
              "";

            return (
              <tr key={index} className={rowClass}>
                <td>{team.Rk}</td>
                <td>
                  <a
                    href={`/t/${team.Squad}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {index < 4 ? team.Squad : team.Squad}
                  </a>
                </td>
                <td>{team.MP}</td>
                <td>{team.W}</td>
                <td>{team.D}</td>
                <td>{team.L}</td>
                <td>{team.GF}</td>
                <td>{team.GA}</td>
                <td>{team.GD}</td>
                <td>{team.Pts}</td>
                <td>{team.Top_Team_Scorer || "N/A"}</td>
                <td>{team.Goalkeeper || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
        {/* <botton onClick={downloadStatsCsv}>Download</botton> */}
      </Table>
    </div>
  );
}
