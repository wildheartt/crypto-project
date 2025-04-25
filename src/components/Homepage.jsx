import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  console.log(data);

  if (isFetching) return 'Loading...';

  return (
    <>
      <Title level={2} className="heading">
        Глобальная крипто-статистика{' '}
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Всего криптовалют" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Всего бирж "
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Общая рыночная капитализация"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Объём за 24 часа"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Всего рынков"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Топ 10 криптовалют
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Показать больше</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Последние новости
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Показать больше</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
