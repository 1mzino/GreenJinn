// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const supportedCurrencies = [
  "BTC",
  "XRP",
  "LTC",
  "ETH",
  "PAX",
  "OMG",
  "BAT",
  "CRV",
  "SNX",
  "UNI",
  "YFI",
  "GRT",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(supportedCurrencies);
  } else {
    res.status(404);
  }
}
