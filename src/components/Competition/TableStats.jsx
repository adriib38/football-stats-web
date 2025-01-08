import styled from "styled-components";



export default function TableStats({ stats }) {
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
      <botton onClick={downloadStatsCsv}>Download</botton>
    </Table>
  );
}
