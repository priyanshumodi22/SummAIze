import Header from "./components/Header";
import ArticleSummary from "./components/Summary";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className="main  dark:bg-black">
        <div className="gradient" />
      </div>

      <div className="app">
        <Header />
        <ArticleSummary />
      </div>
    </main>
  );
};

export default App;
