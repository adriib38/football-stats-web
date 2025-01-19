import { NavLink } from "react-router-dom";

export default function AppMenu() {

  const asideStyle = {
    background: '#4C476B',
    height: "100px",
    alignContent: "center",
    opacity: .8,
    position: "sticky",
    top: 0   
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

  return (
    <aside style={asideStyle}>
      <ul style={ulStyle}>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)} to="/c/LaLiga">LaLiga 🇪🇸</NavLink></li>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)}  to="/c/PremierLeague">Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿</NavLink></li>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)}  to="/c/SerieA">Serie A 🇮🇹</NavLink></li>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)}  to="/c/Bundesliga">Bundesliga 🇩🇪</NavLink></li>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)} to="/c/Ligue1">Ligue 1 🇫🇷</NavLink></li>
        <li><NavLink style={({isActive}) => (isActive ? activeStyle : aStyle)}  to="/c/Hypermotion">Hypermotion 🇪🇸</NavLink></li>
      </ul>
    </aside>
  )
}
  