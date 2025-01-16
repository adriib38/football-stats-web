import { useEffect, useState } from "react";
import { getTeam } from "../../services/TeamApi";
import { useParams, useNavigate } from "react-router-dom";
import colorsTeams from "../../utils/colorsTeams";

export default function Team() {
  const { team } = useParams();
  const navigate = useNavigate();
  const [sTeam, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const resp = await getTeam(team);

        if (resp.resp.status === 404) {
          setNotFound(true);
          return;
        }

        setTeam(resp.data);
      } catch (error) {
        console.error("Error al cargar el equipo:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [team]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (notFound) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1 style={{ color: "red" }}>Equipo no encontrado</h1>
        <p>
          No se pudo encontrar el equipo <strong>{team}</strong>. Por favor,
          verifica el nombre o intenta con otro equipo.
        </p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  const colorsTeam = colorsTeams.find((ct) => ct.name === sTeam.Squad)
    ?.colors || ["#CCCCCC", "#DDDDDD"];

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
        {/* Contenedor para las Franjas Derechas */}
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
          {/* Franja Superior */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: colorsTeam[0],
            }}
          ></div>

          {/* Franja Inferior */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: colorsTeam[1],
            }}
          ></div>
        </div>

        {/* Contenido */}
        <div style={{ padding: "30px" }}>
          <h1
            style={{
              position: "relative",
              color: "black",
              zIndex: 1,
            }}
          >
            {sTeam.Squad}
          </h1>
          <h2>{sTeam.Rk}º {sTeam.league}</h2>
            <footer style={{position: "absolute", bottom: "10px"}}>
                <p>
                    🏟️{sTeam.Last_5} - ⚽{sTeam.Top_Team_Scorer	}

                </p>
            </footer>
        </div>
      </div>
    </>
  );
}
