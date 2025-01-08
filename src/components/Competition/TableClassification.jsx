import styled from "styled-components";

export default function TableClassification({ classification }) {
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
  }

  const Table = styled.table`
    border: 1px solid white;
    border-radius: 20px;
    border-collapse: collapse;
    width: 100%;
    color: #f2f2f2;
    font-weight: bold;
    font-size: 1.2em;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #4c476b;
    thead {
      background-color: #f46036;
    }

    th,
    td {
      padding: 8px;
      text-align: center;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid white;
    }

    tr:hover {
      background-color:rgb(110, 102, 163);
    }
  `;

  return (
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
        {classification.map((team, index) => (
          <tr key={index}>
            <td>{team.Rk}</td>
            <td>{team.Squad}</td>
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
        ))}
      </tbody>
      <botton onClick={downloadStatsCsv}>Download</botton>
    </Table>
  );
}
