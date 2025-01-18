import { createContext, useEffect, useState } from "react";
import { getClassification, getStats, getGames } from "../services/StatsApi";

export const CompetitionContext = createContext();

export function CompetitionContextProvider({ children }) {
  const [competition, setCompetition] = useState(null);
  const [classification, setClassification] = useState([]);
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!competition) return;

    const fetchAllData = async () => {
      setLoading(true);
      
      try {
        const [classResp, statsResp, gamesResp] = await Promise.all([
          getClassification(competition),
          getStats(competition),
          getGames(competition),
        ]);

        setClassification(classResp.data || []);
        setStats(statsResp.data || []);
        setGames(gamesResp.data || []);
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [competition]);

  return (
    <CompetitionContext.Provider
      value={{
        competition,
        setCompetition,
        classification,
        stats,
        games,
        loading,
        error,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}
