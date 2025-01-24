import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SearchHeader from "./SearchHeader";

const Div = styled.div`
  background: #4c476b;
  height: 100px;
  opacity: 0.8;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    height: auto;
    position: initial;
    flex-direction: column;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 20px;
  margin: 0;
  gap: 60px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;

  }
`;

const Li = styled.li`
  margin: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;

  &.active {
    color: #ffd700;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export default function AppMenu() {
  const leagues = [
    {
      path: "/c/laliga",
      name: "LaLiga",
      flag: "/img/flags/es.png",
      alt: "España",
    },
    {
      path: "/c/premierleague",
      name: "Premier League",
      flag: "/img/flags/in.png",
    },
    { path: "/c/seriea", name: "Serie A", flag: "/img/flags/it.png" },
    { path: "/c/bundesliga", name: "Bundesliga", flag: "/img/flags/gr.png" },
    {
      path: "/c/ligue1",
      name: "Ligue 1",
      flag: "/img/flags/fr.png",
      alt: "Francia",
    },
    { path: "/c/hypermotion", name: "Hypermotion", flag: "/img/flags/es.png" },
  ];

  return (
    <Div>
      <div>
        <Ul>
          {leagues.map((league) => (
            <Li key={league.path}>
              <StyledNavLink to={league.path}>
                {league.name}{" "}
                <img src={league.flag} width="20px" alt={league.alt} />
              </StyledNavLink>
            </Li>
          ))}
        </Ul>
      </div>
      <div style={{ alignSelf: "center" }}>
        <SearchHeader />
      </div>
    </Div>
  );
}
