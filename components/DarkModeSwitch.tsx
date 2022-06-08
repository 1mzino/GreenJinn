import { useTheme } from "next-themes";
import { MoonIcon } from "@heroicons/react/outline";

const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <MoonIcon
      className="h-6 w-6 cursor-pointer dark:stroke-white stroke-black"
      onClick={toggleTheme}
    />
  );
};

export default DarkModeSwitch;
