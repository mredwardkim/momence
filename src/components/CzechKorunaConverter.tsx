import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { currency, Title } from './CzechKorunaApp';
import CzechKorunaConvertedAmount from './CzechKorunaConvertedAmount';

const CurrencyConverter = styled.div`
  margin-left: 80px;
`;

const CurrencyConverterForm = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: 12px 0;
  row-gap: 8px;
  column-gap: 8px;
`;

const CurrencyConverterRow = styled.div`
  grid-column: 1 / span 2;
  text-align: right;
`;

function CzechKorunaConverter({
  currencies,
}: {
  currencies: Map<string, currency>;
}) {
  const [koruna, setKoruna] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const [displayConversion, setDisplayConversion] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCurrency == null && currencies.size > 0) {
      setSelectedCurrency(currencies.entries().next().value[0]);
    }
  }, [currencies, selectedCurrency]);

  return (
    <CurrencyConverter>
      <Title>Czech Koruna Converter</Title>
      <CurrencyConverterForm>
        <label>Czech Koruna to convert:</label>
        <input
          type="number"
          value={koruna}
          onChange={(e) => {
            setDisplayConversion(false);
            setKoruna(e.target.value);
          }}
        />
        Currency to convert to:
        <select
          onChange={(e) => {
            setDisplayConversion(false);
            setSelectedCurrency(e.target.value);
          }}
        >
          {Array.from(currencies.keys()).map((currency) => {
            const curr = currencies.get(currency);
            if (curr == null) return null;
            return (
              <option
                key={curr.code}
                value={curr.code}
              >{`${curr.code} - ${curr.country} ${curr.currency}`}</option>
            );
          })}
        </select>
        <CurrencyConverterRow>
          <input
            type="submit"
            value="Convert"
            onClick={() => setDisplayConversion(true)}
          />
        </CurrencyConverterRow>
      </CurrencyConverterForm>
      {displayConversion && koruna !== '' && selectedCurrency && (
        <CzechKorunaConvertedAmount
          korunaAmount={koruna != null ? Number(koruna) : null}
          currency={currencies.get(selectedCurrency)}
        />
      )}
    </CurrencyConverter>
  );
}

export default CzechKorunaConverter;
