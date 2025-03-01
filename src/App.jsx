import './App.css';
import Competition from './components/Competition/Competition';
import AppMenu from './components/Header/Header';
import Footer from './components/Footer/Footer.jsx';
import Team from './components/Team/Team';
import Inicio from './components/Inicio/Inicio';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CompetitionContextProvider } from './context/CompetitionContext';
import { TeamContextProvider } from './context/TeamContext';
import { inject } from '@vercel/analytics';

inject();

function App() {
  return (
    <BrowserRouter>
      <CompetitionContextProvider>
        <TeamContextProvider>
          <div className="App">
            <AppMenu />
            <div id="content">
              <Routes>
                <Route 
                  path="/" 
                  element={<Inicio />}
                />
                <Route 
                  path="/c/:competition" 
                  element={<Competition />}
                />
                <Route 
                  path="/t/:team" 
                  element={<Team />}
                />
                <Route 
                  path="*" 
                  element={<p>404 - Página no encontrada</p>} 
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </TeamContextProvider>
      </CompetitionContextProvider>
    </BrowserRouter>
  );
}

export default App;
