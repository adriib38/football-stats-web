import { useContext } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";

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

export default function Games() {
  const { games } = useContext(CompetitionContext);

  return (
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
            <td style={tablePartidosThTdStyle}>
              {game.Score === null ? "Por jugar" : `${game.Score}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
