import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import CraftsDis from './component/craftsDis';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CraftsDis />
      {/* <Routes /> */}

    </BrowserRouter>
  );
}

export default App;
