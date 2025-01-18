import { NavLink } from "react-router-dom";

export default function AppMenu() {

  const asideStyle = {
    background: '#4C476B',
  };
  
  const ulStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 20
  };
  
  const aStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  return (
    <>
      <header style={{background: 'black', color: 'white', height: 50, textAlign: 'center'}}>

      </header>
      <aside style={asideStyle}>
        <ul style={ulStyle}>
          <li><NavLink style={aStyle} to="/c/LaLiga">LaLiga 🇪🇸</NavLink></li>
          <li><NavLink style={aStyle} to="/c/PremierLeague">Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿</NavLink></li>
          <li><NavLink style={aStyle} to="/c/SerieA">Serie A 🇮🇹</NavLink></li>
          <li><NavLink style={aStyle} to="/c/Bundesliga">Bundesliga 🇩🇪</NavLink></li>
          <li><NavLink style={aStyle} to="/c/Ligue1">Ligue 1 🇫🇷</NavLink></li>
          <li><NavLink style={aStyle} to="/c/Hypermotion">Hypermotion 🇪🇸</NavLink></li>
        </ul>
      </aside>
    </>
  )
}
  