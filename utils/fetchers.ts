export const getSupportedCurrencies = async () => {
  try {
    const supportedCurrencies = await fetch(
      "https://green-jinn-fe-test.vercel.app/api/currencies"
    ).then((res) => res.json());
    return supportedCurrencies;
  } catch (err) {
    throw new Error("Error fetching list of supported currencies");
  }
};

export const fetchBitStamp = async (id: string) => {
  try {
    const response = await fetch(
      `https://www.bitstamp.net/api/v2/ticker/${id.toLowerCase()}usd`
    ).then((res) => res.json());

    const value = Number(response.last);
    return value;
  } catch (err) {
    throw new Error("Error fetching ticker value from BitStamp API");
  }
};

export const fetchCoinBase = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.coinbase.com/v2/exchange-rates?currency=${id.toUpperCase()}`
    ).then((res) => res.json());

    const value = Number(response.data.rates["USD"]);
    return value;
  } catch (err) {
    throw new Error("Error fetching ticker value from Coinbase API");
  }
};

export const fetchBitFinex = async (id: string) => {
  try {
    const response = await fetch(
      `https://api-pub.bitfinex.com/v2/tickers?symbols=t${id.toUpperCase()}USD`
    ).then((res) => res.json());

    const value = Number(response[0][1]);
    return value;
  } catch (err) {
    throw new Error("Error fetching ticker value from BitFinex API");
  }
};

export const getAverageValues = async (supportedCurrencies: string[]) => {
  return await Promise.all(
    supportedCurrencies.map(async (currency: string) => {
      const res1 = await fetchBitStamp(currency);
      const res2 = await fetchCoinBase(currency);
      const res3 = await fetchBitFinex(currency);

      const values = [res1, res2, res3];
      const total = values.reduce((acc, c) => acc + c, 0);

      if (total) {
        return { currency, price: total / values.length };
      }
    })
  );
};

export const getTradingPairs = async () => {
  try {
    const response = await fetch(
      `https://www.bitstamp.net/api/v2/trading-pairs-info/`
    ).then((res) => res.json());

    return response;
  } catch (err) {
    throw new Error("Error fetching ticker value from Coinbase API");
  }
};
