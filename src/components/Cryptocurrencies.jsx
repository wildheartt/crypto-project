import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching, error } = useGetCryptosQuery(count);

  const [searchTerm, setSearchTerm] = useState('');

  if (isFetching) return <Loader />;
  if (error) return <p>Ошибка загрузки данных</p>;

  const cryptos =
    data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <div className="search-crypto">
        <Input
          placeholder="Поиск криптовалюты"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }
                hoverable
              >
                <p>Цена: {millify(currency.price)}</p>
                <p>Изменение: {millify(currency.change)}%</p>
                <p>Объём: {millify(currency.marketCap)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
