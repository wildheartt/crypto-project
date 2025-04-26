import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const News = () => {
  const { data, isFetching, error } = useGetCryptoNewsQuery({
    newsCategory: 'Elon Musk', // или 'Cryptocurrency'
    count: 10, // тот же limit, что был в fetch-примере
  });

  if (isFetching) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.error || 'API error'}</p>;

  return (
    <ul>
      {data?.value?.map((n) => (
        <li key={n.id}>{n.name}</li>
      ))}
    </ul>
  );
};

export default News;
