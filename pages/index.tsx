import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import DarkModeSwitch from "../components/DarkModeSwitch";
import ListItem from "../components/ListItem";
import {
  getAverageValues,
  getSupportedCurrencies,
  getTradingPairs,
} from "../utils/fetchers";
import { ILandingPage, ITradingPair, ITradingPairs } from "../utils/interfaces";

export const getServerSideProps: GetServerSideProps = async () => {
  const supportedCurrencies = await getSupportedCurrencies();
  const averageTickerValues = await getAverageValues(supportedCurrencies);
  const tradingPairs = await getTradingPairs();
  console.log("TRADING PAIRS", tradingPairs);

  return {
    props: {
      averageTickerValues,
      tradingPairs,
    },
  };
};

const currencies = ["USD", "GBP", "EUR", "BTC", "ETH"];

const fetcher: Fetcher<ITradingPair> = async (url: string) =>
  await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

const Home: NextPage<ILandingPage> = ({
  averageTickerValues,
  tradingPairs,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [tradingPair, setTradingPair] = useState<string | undefined>();

  const handleSetCurrency = (e: any) => {
    console.log("CHANGING CURRENCY", e.target.value);
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  const handleSetTradingPair = (e: any) => {
    console.log(e.target.value);
    const newTradingPair = e.target.value;
    setTradingPair(newTradingPair);
  };

  const { data: tradingPairData, error: tradingPairError } = useSWR(
    tradingPair
      ? `https://www.bitstamp.net/api/v2/ticker/${tradingPair.toLowerCase()}`
      : null,
    fetcher
  );

  return (
    <div className="h-screen w-screen flex flex-col touch-pan-y">
      <header className="p-4 lg:px-8 bg-white dark:bg-black/20 flex justify-end border-b border-b-gray-200 dark:border-b-gray-800">
        <DarkModeSwitch />
      </header>

      <main className="grow rounded space-y-4 max-w-[1280px] lg:bg-white dark:bg-gray-900 mt-2 lg:mt-6 p-4 md:p-8 md:mx-8 lg:mx-auto">
        <section className="flex flex-col gap-y-1">
          <h1 className="font-semibold text-2xl lg:text-3xl">
            Featured Average Ticker Values
          </h1>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            The displayed price is the mean average value calculated using the
            BitStamp, Coinbase and Bitfinex APIs.
          </p>

          <ul className="border-b-4 dark:border-b-gray-800 py-4 lg:py-6 flex flex-col lg:flex-row lg:flex-wrap gap-2 lg:gap-y-4 lg:gap-x-2 justify-start">
            {averageTickerValues.map((value) => (
              <ListItem key={value.currency} value={value} />
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-y-1">
          <h1 className="font-semibold text-2xl lg:text-3xl">Trading Pairs</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            The displayed trading pair values are fetched from the Bitstamp API,
            refreshed every 10 seconds.
          </p>
          <span className="flex flex-row my-2 items-center py-1 space-x-4">
            <button className="text-xs font-semibold">
              Filter by currency:
            </button>

            <select
              value={currency}
              onChange={handleSetCurrency}
              className="px-2 py-1.5 rounded text-xs"
              name="currency"
              id="currency"
            >
              {currencies.map((currency, i) => (
                <option key={i}>{currency}</option>
              ))}
            </select>
          </span>

          <ul className="grid grid-cols-4 lg:grid-cols-10">
            {tradingPairs
              .filter(
                ({ name }: ITradingPairs) =>
                  name.includes(`/${currency}`) && !name.endsWith("T")
              )
              .slice(0, 8)
              .map(({ url_symbol, name }: ITradingPairs) => {
                return (
                  <button
                    value={url_symbol}
                    onClick={handleSetTradingPair}
                    key={url_symbol}
                    className="cursor-pointer px-4 py-1.5 bg-gray-200/50 dark:bg-black/20 rounded mr-2 mb-2 text-xs text-gray-600 dark:text-inherit font-semibold text-center"
                  >
                    {name}
                  </button>
                );
              })}
          </ul>

          {!tradingPairData && !tradingPairError && tradingPair && (
            <p>loading</p>
          )}

          {!tradingPairData && tradingPairError && (
            <p>{JSON.stringify(tradingPairError.message)}</p>
          )}

          {tradingPairData && (
            <div className="mt-2 lg:mt-0 rounded-md border-2 lg:border-none border-gray-100/50 bg-white dark:bg-gray-800 p-2 lg:p-4 ">
              <h1 className="text-xl uppercase font-semibold">
                {`Trading Pair: ${tradingPair}`}
              </h1>

              <ul className="mt-1 lg:grid grid-cols-2">
                <li className="text-sm font-medium text-gray-400">
                  {`Last Price: ${Number(tradingPairData.last).toLocaleString(
                    "en-US"
                  )} ${currency}`}
                </li>
                <li className="text-sm font-medium text-gray-400">
                  {`Volume ${Number(tradingPairData.volume).toLocaleString(
                    "en-US"
                  )}  ${currency}`}
                </li>
                <li className="text-sm font-medium text-gray-400">
                  {`High: ${Number(tradingPairData.high).toLocaleString(
                    "en-US"
                  )}  ${currency}`}
                </li>
                <li className="text-sm font-medium text-gray-400">
                  {`Low: ${Number(tradingPairData.low).toLocaleString(
                    "en-US"
                  )}  ${currency}`}
                </li>
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
