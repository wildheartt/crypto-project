import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]);

  const count = simplified ? 5 : 10;
  const { data, isFetching, error } = useGetCryptosQuery(count);

  const cryptosList = data?.data?.coins ?? [];

  useEffect(() => {
    const filtered = cryptosList.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptos(filtered);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  if (error) return <p>Ошибка загрузки данных</p>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Поиск криптовалюты"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
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
