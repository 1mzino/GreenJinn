import { IValue } from "../utils/interfaces";

const ListItem = ({ value }: IValue) => {
  return (
    <li className="cursor-pointer select-none flex py-2 px-4 lg:p-5 lg:w-fit gap-x-16 rounded lg:rounded-lg border-2 dark:border-black/[5%] dark:lg:border-gray-900 bg-white/80 dark:bg-black/[15%] hover:bg-gray-50 dark:hover:bg-white/[5%] hover:-translate-y-2 transition-all active:scale-105 active:bg-gray-100 dark:active:bg-white/20">
      <h1 className="font-semibold">{value.currency}</h1>
      <p className="text-gray-400">${value.price.toFixed(2)}</p>
    </li>
  );
};

export default ListItem;
