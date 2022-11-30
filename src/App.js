import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import LandingPage from './components/LandingPage';
function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
