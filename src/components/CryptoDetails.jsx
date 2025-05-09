import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimeperiod] = useState('7d');
  const { data, isFetching, error } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod
  });

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data?.coin) return <div>No data available</div>;

  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Цена в долларах США',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />
    },
    { title: 'Ранг', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: 'Рыночная капитализация',
      value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />
    },
    {
      title: 'Абсолютный максимум (дневн. ср.)',
      value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />
    }
  ];

  const genericStats = [
    {
      title: 'Количество рынков',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />
    },
    {
      title: 'Количество бирж',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />
    },
    {
      title: 'Подтверждённое предложение',
      value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />
    },
    {
      title: 'Общее предложение',
      value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />
    },
    {
      title: 'Циркулирующее предложение',
      value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />
    }
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) стоимость
        </Title>
        <p>
          {cryptoDetails.name} онлайн цена в долларах США (USD). Просмотреть статистических данных о
          стоимости, капитализации рынка и предложении.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={value => setTimeperiod(value)}
      >
        {time.map(date => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {coinHistory && (
        <LineChart
          key={timePeriod}
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
        />
      )}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Статистика {cryptoDetails.name}
            </Title>
            <p>
              Обзор, показывающий статистику {cryptoDetails.name}, такую как базовая и котируемая
              валюта, ранг и объём торгов.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Дополнительные данные
            </Title>
            <p>
              Обзор, показывающий статистику {cryptoDetails.name}, такую как базовая и котируемая
              валюта, ранг и объём торгов.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            Что такое {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            Полезные ссылки по {cryptoDetails.name}
          </Title>
          {cryptoDetails.links?.map(link => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
