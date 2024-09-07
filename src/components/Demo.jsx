import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
    length: 3,
  });

  const [allArticles, setAllArticles] = useState([]);

  const [copied_url, setCopied_url] = useState("");
  const [copied_Summary, setCopied_Summary] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesfromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesfromLocalStorage) {
      setAllArticles(articlesfromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
      length: article.length,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

      console.log(newArticle);
    }
  };

  const handleCopy_url = (copyUrl) => {
    setCopied_url(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied_url(false), 3000);
  };

  const handleCopy_Summary = (copy_summary) => {
    setCopied_Summary(copy_summary);
    navigator.clipboard.writeText(copy_summary);
    setTimeout(() => setCopied_Summary(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-4xl">
      {/* search component */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          {/* input for length of paragraph */}
          <input
            type="number"
            placeholder="Length"
            value={article.length}
            onChange={(e) =>
              setArticle({ ...article, length: parseInt(e.target.value) })
            }
            required
            className="length_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browse URL history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-scroll scrollbar">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={() => handleCopy_url(item.url)}
              >
                <img
                  src={copied_url === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Summary component */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black">
            Well, that wasn&apos;t supposed to happen... Please try again later.
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl dark:text-white">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
                <div
                  className="copy_btn"
                  onClick={() => handleCopy_Summary(article.summary)}
                >
                  <img
                    src={copied_Summary === article.summary ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
