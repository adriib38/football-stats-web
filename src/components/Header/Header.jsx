import { NavLink } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"

export default function AppMenu() {

  const asideStyle = {
    background: '#4C476B',
    height: "100px",
    alignContent: "center",
    opacity: .8,
    position: "sticky",
    top: 0,
    zIndex: 1
  };
  
  const ulStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 20
  };
  
  const aStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: "bold",
    fontSize: "1.2em",
  }

  
  const activeStyle = {
    color: "#FFD700",
    textDecoration: 'none',
    fontWeight: "bold",
    fontSize: "1.2em",
  };

  const leagues = [
    { path: "/c/laliga", name: "LaLiga", flag: "/img/flags/es.png", alt: "España" },
    { path: "/c/premierleague", name: "Premier League", flag: "/img/flags/in.png"},
    { path: "/c/seriea", name: "Serie A", flag: "/img/flags/it.png"},
    { path: "/c/bundesliga", name: "Bundesliga", flag: "/img/flags/gr.png" },
    { path: "/c/ligue1", name: "Ligue 1", flag: "/img/flags/fr.png", alt: "Francia" },
    { path: "/c/hypermotion", name: "Hypermotion", flag: "/img/flags/es.png" },
  ];

  return (
    <aside style={asideStyle}>
      <ul style={ulStyle}>
        {leagues.map((league) => (
          <li key={league.path}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : aStyle)}
              to={league.path}
            >
              {league.name} 
              <img src={league.flag} width="20px" alt={league.alt} />
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
  