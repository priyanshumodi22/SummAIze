import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const Hero = () => {
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
        <img
          src="https://media.discordapp.net/attachments/1142888467920064672/1249268215607984200/logo.png?ex=6666af30&is=66655db0&hm=39800296ce82e470e616db74f9fac8fd54ffd1c4f71494f53294125dc43330a5&=&format=webp&quality=lossless"
          alt="SummAIze"
          className="logo"
        />
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
        <span className="orange_gradient">OpenAI GPT-4</span>
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

export default Hero;
