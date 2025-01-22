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
      setNotFound(false);
      
      try {
        const [teamResp, teamGamesResp] = await Promise.all([
          getTeam(team),
          getTeamGames(team)
        ]);

        if (teamResp.resp.status === 404 || teamGamesResp.resp.status === 404) {
          setNotFound(true);
        } else {
          setTeamData(teamResp.data || []);
          setTeamGames(teamGamesResp.data || []);
        }

      } catch (error) {
        setError(error.message);
        setNotFound(true);
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
        notFound
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
