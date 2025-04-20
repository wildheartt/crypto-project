import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
            <Switch>
              <Route exact path="/">
                <h1>Homepage</h1>
              </Route>
              <Route exact path="/cryptocurrencies">
                <h1>Cryptocurrencies</h1>
              </Route>
              <Route exact path="/exchanges">
                <h1>Exchanges</h1>
              </Route>
              <Route exact path="/crypto/:coinId">
                <h1>CryptoDetails</h1>
              </Route>
              <Route exact path="/news">
                <h1>News</h1>
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
