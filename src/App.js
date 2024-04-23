import './App.css';
import About from './Pages/About';
import Home from './Pages/Home';
import Layout from './Pages/Layout';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TouristAtractions from './Pages/TouristAtractions';
import Hotels from './Pages/Hotels';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tourist-atractions" element={<TouristAtractions />} />
          <Route path="/hotels" element={<Hotels />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
