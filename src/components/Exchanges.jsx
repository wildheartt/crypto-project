import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Empty } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges ?? [];

  if (isFetching) return <Loader />;
  if (error || exchanges.length === 0)
    return <Empty description="Список бирж недоступен (нужен премиум-план)" />;

  return (
    <>
      <Row style={{ fontWeight: 600, marginBottom: 8 }}>
        <Col span={6}>Биржа</Col>
        <Col span={6}>Объём 24 ч</Col>
        <Col span={6}>Рынков</Col>
        <Col span={6}>Доля рынка</Col>
      </Row>

      <Row gutter={[0, 8]}>
        {exchanges.map((ex) => (
          <Col span={24} key={ex.uuid}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text strong>{ex.rank}.</Text>{' '}
                      <Avatar
                        className="exchange-image"
                        src={ex.iconUrl}
                        alt={ex.name}
                      />{' '}
                      <Text strong>{ex.name}</Text>
                    </Col>
                    <Col span={6}>${millify(ex.volume)}</Col>
                    <Col span={6}>{millify(ex.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(ex.marketShare)}%</Col>
                  </Row>
                }
              >
                {ex.description
                  ? HTMLReactParser(ex.description)
                  : 'Описание отсутствует'}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
