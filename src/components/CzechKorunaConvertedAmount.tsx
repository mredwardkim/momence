import React from 'react';

import { currency } from './CzechKorunaApp';

interface Props {
  currency: currency | undefined;
  korunaAmount: number | null;
}

function CzechKorunaConvertedAmount({ currency, korunaAmount }: Props) {
  if (korunaAmount == null || currency == null) {
    return null;
  }

  const convertedAmount = (korunaAmount * currency?.amount) / currency?.rate;

  return (
    <div style={{ textAlign: 'center' }}>
      {`${convertedAmount.toLocaleString()} ${currency.code}`}
    </div>
  );
}

export default CzechKorunaConvertedAmount;
