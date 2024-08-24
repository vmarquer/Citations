import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AppContextProvider } from './components/contexts/Context';
import { Home } from './components/pages/Home';
import { Game } from './components/pages/Game';
import { HomeButton } from './components/common/HomeButton';

function App() {
  return (
    <div>
      <Router>
        <HomeButton/>
        <Routes>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="/home" element={<AppContextProvider><Home /></AppContextProvider>} />
          <Route path="/game" element={<AppContextProvider><Game /></AppContextProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
