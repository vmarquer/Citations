import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AppContextProvider } from './components/contexts/Context';
import { Home } from './components/pages/Home';
import { Game } from './components/pages/Game';
import { HomeButton } from './components/common/HomeButton';
import { Results } from './components/pages/Results';
import { LanguageSelector } from './components/common/LanguageSelector';

function App() {
  return (
    <AppContextProvider>
      <Router basename="/Citations">
        <HomeButton />
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
