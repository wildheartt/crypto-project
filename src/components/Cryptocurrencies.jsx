import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      const filteredData = cryptosList.data.coins.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!cryptos?.length) return <div>No cryptocurrencies found</div>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                hoverable
              >
                <p>Цена: {millify(currency.price)}</p>
                <p>Рыночная капитализация: {millify(currency.marketCap)}</p>
                <p>Изменение за сутки: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

Cryptocurrencies.propTypes = {
  simplified: PropTypes.bool
};

Cryptocurrencies.defaultProps = {
  simplified: false
};

export default Cryptocurrencies;
