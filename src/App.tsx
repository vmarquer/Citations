import './App.css';
import { AppContextProvider } from './components/contexts/Context';
import { Home } from './components/pages/Home';

function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}

export default App;
