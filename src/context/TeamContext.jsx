import { createContext, useEffect, useState } from "react";
import { getTeamGames } from "../services/TeamApi";
import { getTeam } from "../services/TeamApi";

export const TeamContext = createContext();

export function TeamContextProvider({ children }) {
  const [team, setTeam] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [teamGames, setTeamGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!team) return;

    const fetchAllData = async () => {
      setLoading(true);
      
      try {
        console.log("Ha buscar: "+team)
        const [teamResp, teamGamesResp] = await Promise.all([
          getTeam(team),
          getTeamGames(team)
        ]);

        setTeamData(teamResp.data || []);
        setTeamGames(teamGamesResp.data || []);

      } catch (error) {
        setError(error.message);
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [team]);

  return (
    <TeamContext.Provider
      value={{
        setTeam,
        teamData,
        teamGames,
        loading,
        error,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
