import './App.css';
import About from './Pages/About';
import Home from './Pages/Home';
import Layout from './Pages/Layout';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TouristAtractions from './Pages/TouristAtractions';
import Hotels from './Pages/Hotels';
import { useState } from 'react';
import Login from './Pages/Login';
function App() {
  const [user, setUser] = useState(false)

  return (
    <Router>
      <Routes>
        {
          user ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/tourist-atractions" element={<TouristAtractions />} />
              <Route path="/hotels" element={<Hotels />} />
            </Route>
          ) : (<Route path="/" element={<Login setUser={()=>{setUser(true)}}/>} />)
        }
      </Routes>
    </Router>
  );
}

export default App;
