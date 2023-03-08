import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import CzechKorunaConverter from './CzechKorunaConverter';
import CzechKorunaExchangeRates from './CzechKorunaExchangeRates';

// const url =
//   'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const url = 'http://localhost:3000/daily.txt';

export interface currency {
  amount: number;
  code: string;
  country: string;
  currency: string;
  rate: number;
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 0px;
  text-align: center;
`;

function CzechKorunaApp() {
  const [date, setDate] = useState<string>();
  const [currencies] = useState<Map<string, currency>>(new Map());

  const { isLoading, data } = useQuery('currencyData', () =>
    fetch(url, { mode: 'no-cors' }).then((res) => res.text()),
  );

  useEffect(() => {
    if (data == null) return;

    const rows = data.split('\n');
    setDate(rows[0]);

    rows.slice(2).forEach((row) => {
      const [country, currency, amount, code, rate] = row.split('|');
      currencies.set(code, {
        country,
        currency,
        amount: Number(amount),
        code,
        rate: Number(rate),
      });
    });
  }, [currencies, data]);

  if (isLoading) {
    return <AppContainer>Loading...</AppContainer>;
  }

  return (
    <AppContainer>
      <CzechKorunaExchangeRates date={date} currencies={currencies} />
      <CzechKorunaConverter currencies={currencies} />
    </AppContainer>
  );
}

export default CzechKorunaApp;
