import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AppContextProvider } from './components/contexts/Context';
import { Home } from './components/pages/Home';
import { Game } from './components/pages/Game';
import { HomeButton } from './components/common/HomeButton';
import { Results } from './components/pages/Results';
import { ResultsButton } from './components/common/ResultsButton';

function App() {
  return (
    <div>
      <Router basename="/Citations">
        <HomeButton/>
        <ResultsButton/>
        <Routes>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="/home" element={<AppContextProvider><Home /></AppContextProvider>} />
          <Route path="/game" element={<AppContextProvider><Game /></AppContextProvider>} />
          <Route path="/results" element={<AppContextProvider><Results /></AppContextProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
