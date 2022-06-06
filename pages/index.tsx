import type { GetStaticProps, NextPage } from "next";
import { getAverageValues, getSupportedCurrencies } from "../utils/fetchers";

interface IProps {
  averageTickerValues: {
    currency: string;
    price: number;
  }[];
}

export const getStaticProps: GetStaticProps = async () => {
  // FETCH SUPPORTED CURRENCIES
  const supportedCurrencies = await getSupportedCurrencies();
  console.log("SUPPORTED CURRENCIES:", supportedCurrencies);

  const averageTickerValues = await getAverageValues(supportedCurrencies);

  return {
    props: {
      averageTickerValues,
    },
  };
};

const Home: NextPage<IProps> = ({ averageTickerValues }) => {
  console.log(averageTickerValues);
  return (
    <main className="p-4">
      <ul>
        {averageTickerValues.map((value) => (
          <li key={value.currency} className="flex gap-2">
            <h1 className="font-bold">{value.currency}</h1>
            {value.price}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
