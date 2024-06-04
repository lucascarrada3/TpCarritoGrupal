import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodList from './Components/ListaComida';
import Cart from './Components/Cart';
import './Styles/App.css'; // Importa los estilos aquí
import Navbar from './Components/Navbar';
import Home from './Components/Home'; // Importa el componente Home

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<FoodList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
