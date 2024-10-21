import { useEffect, useState } from "react";

const MainNews = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const cate = category === "all" ? "" : `&category=${category}`;
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      // const url = `https://newsapi.org/v2/top-headlines?country=kr${cate}&apiKey=&{apiKey}`;
      // const url = `https://newsapi.org/v2/top-headlines?country=kr${cate}&apiKey=3edbe8fb44eb4142988957f180c08ef1`;
      const url = `https://newsapi.org/v2/top-headlines?country=us${cate}&apiKey=4d04ef5559d647efa5e26f934f7db879`;
      const res = await fetch(url);
      const datas = await res.json();
      setData(datas.articles);
    };
    getNews();
  }, [category]);

  // <br> 태그 제거
  const removeHtmlTags = (str) => {
    return str.replace(/<br\s*\/?>/gi, '');
  };

  return (
    <div style={{ width: "100%", height: "103%", overflowY: "scroll" }}>
      <div
        style={{ width: "97%", height: "98.5%", margin: "1.5% 1.5% 0 1.5%" }}
      >
        {data.map((v, i) => {
          return (
            <div key={i}>
              <p
                style={{
                  margin: "0",
                  fontSize: "2.2vmin",
                  fontWeight: "bold",
                }}
              >
                <a href={v.url} target="_blank">
                  {v.title}
                </a>
              </p>
              {
                v.urlToImage && v.description && (
                  <div className="content" style={{ display: "flex", alignItems: "center", marginTop: "1.8vh" }}>
                    {v.urlToImage && (
                      <img
                        src={v.urlToImage}
                        style={{
                          width: "15%",
                          height: "20%",
                          marginRight: "1vw"
                        }}
                      />
                    )}
                    {v.description && <p style={{ margin: "0", fontSize: "1.8vmin" }} dangerouslySetInnerHTML={{ __html: removeHtmlTags(v.description) }}></p>}
                  </div>
                )
              }
              <hr style={{ margin: '2.5vh 0 2.5vh 0' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MainNews;