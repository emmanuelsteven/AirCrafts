import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import CraftsDis from './component/craftsDis';
import CraftDescription from './component/CraftDetails';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CraftsDis />} />
          <Route path="/crafts/:jobId" element={<CraftDescription />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
