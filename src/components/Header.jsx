import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const Header = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeswitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src="/logo.png" alt="SummAIze" className="logo" />
        <div className="black_button flex items-center">
          <button
            onClick={handleThemeswitch}
            className="black_toggle dark:bg-slate-950 focus:outline-none"
          >
            {theme === "dark" ? <FaMoon /> : <BsSunFill />}
          </button>
          {/* <button
            type="button"
            onClick={() =>
              window.open("https://github.com/priyanshumodi22/SummAIze")
            }
            className="black_btn dark:bg-slate-950 ml-4"
          >
            Github
          </button> */}
        </div>
      </nav>
      <h1 className="head_text dark:text-slate-400">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">Ai</span>
      </h1>
      <h2 className="desc dark:text-slate-400">
        Summ<span className="text-orange-500">AI</span>ze is a powerful
        open-source article summarizer that condenses long articles into brief,
        easy-to-understand summaries. It simplifies reading by providing clear
        and concise information, making it a valuable tool for quick
        comprehension.
      </h2>
    </header>
  );
};

export default Header;
