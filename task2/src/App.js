import React, { useState, useRef } from 'react';
import { useInterval } from './hooks';

import dayjs from 'dayjs';

import { Header } from './components/Header';
import { Table } from './components/Table';
import { ChartCanvas } from './components/Chart';

import './App.scss';

function App() {
  const [rateHistory, setRateHistory] = useState([]);
  const counter = useRef(0);

  const appendRate = async () => {
    const { USD, EUR } = await fetch('https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR')
      .then(res => res.json())
      .then(data => data.rates)
      .catch(() => { console.error('API is not available') });

      const prevHistory = rateHistory.length > 9
        ? rateHistory.slice(1)
        : rateHistory;

    setRateHistory([
      ...prevHistory,
      {
        id: counter.current,
        timestamp: Date.now(),
        usd: formatRate(USD),
        eur: formatRate(EUR)
      }
    ]);

    counter.current++;
  }

  const formatRate = (rate) => ((1 / rate).toFixed(2));

  const rates = {
    labels: rateHistory.map(rate => dayjs(rate.timestamp).format('HH:mm')),
    usd: rateHistory.map(rate => rate.usd),
    eur: rateHistory.map(rate => rate.eur)
  };

  useInterval(appendRate, (0.1 * 60 * 1000));

  return (
    <div className='App Container'>
      <Header />
      <div className='App__content Row'>
        <div className='Col Col_4'>
          <Table rates={rateHistory} />
        </div>
        <div className='Col Col_8'>
          <ChartCanvas rates={rates} />
        </div>
      </div>
    </div>
  );
}

export default App;
