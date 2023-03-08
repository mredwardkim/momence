import React from 'react';
import styled from 'styled-components';
import { currency, Title } from './CzechKorunaApp';

const Subtitle = styled.p`
  font-size: 14px;
  margin-top: 0px;
  text-align: center;
`;

const ExchangeRatesTable = styled.div`
  margin-top: 20px;
`;

interface Props {
  currencies: Map<string, currency>;
  date: string | undefined;
}

function CzechKorunaExchangeRates({ date, currencies }: Props) {
  return (
    <div>
      <Title>Czech Koruna Exchange Rates</Title>
      <Subtitle>{date}</Subtitle>
      <ExchangeRatesTable>
        {Array.from(currencies.keys()).map((currency) => {
          const curr = currencies.get(currency);
          if (curr == null) return null;
          return (
            <div key={curr.code}>{`${curr.code} - ${curr.country} ${
              curr.currency
            } - ${(curr.amount / curr.rate).toLocaleString()}`}</div>
          );
        })}
      </ExchangeRatesTable>
    </div>
  );
}

export default CzechKorunaExchangeRates;
