import './App.css';
import Competition from './components/Competition/Competition';
import AppMenu from './components/Header/Header';
import Inicio from './components/Inicio/Inicio';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppMenu />
        <div id="content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Inicio />
              }
            />
            <Route 
              path="/c/:competition" 
              element={
                <Competition />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
