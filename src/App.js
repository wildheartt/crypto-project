import React from 'react';
import { Switch, Route, Routes, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from './components';

import './App.css';
const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<h1>Homepage</h1>} />
              <Route
                path="/cryptocurrencies"
                element={<h1>Cryptocurrencies</h1>}
              />
              <Route path="/exchanges" element={<h1>Exchanges</h1>} />
              <Route path="/crypto/:coinId" element={<h1>CryptoDetails</h1>} />
              <Route path="/news" element={<h1>News</h1>} />
            </Routes>
          </div>
        </Layout>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
