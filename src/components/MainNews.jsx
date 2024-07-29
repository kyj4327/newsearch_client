import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromBackend } from "../api"; // fetchDataFromBackend 함수 가져오기

const MainNews = ({ category }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await fetchDataFromBackend(`/news?category=${category}`);
        setData(res.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    getNews();
  }, [category]);

  const removeHtmlTags = (str) => {
    return str.replace(/<br\s*\/?>/gi, "");
  };

  const handleTitleClick = (url) => {
    navigate("/news", { state: { url, search: category } });
  };

  return (
    <div style={{ width: "100%", height: "103%", overflowY: "scroll" }}>
      <div
        style={{ width: "97%", height: "98.5%", margin: "1.5% 1.5% 0 1.5%" }}
      >
        {data.map((v, i) => (
          <div key={i}>
            <p
              style={{
                margin: "0",
                fontSize: "2.2vmin",
                fontWeight: "bold",
              }}
            >
              <span
                onClick={() => handleTitleClick(v.url)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                dangerouslySetInnerHTML={{ __html: v.title }}
              />
            </p>
            {v.urlToImage && v.description && (
              <div
                className="content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1.8vh",
                }}
              >
                {v.urlToImage && (
                  <img
                    src={v.urlToImage}
                    style={{
                      width: "15%",
                      height: "20%",
                      marginRight: "1vw",
                    }}
                  />
                )}
                {v.description && (
                  <p
                    style={{ margin: "0", fontSize: "1.8vmin" }}
                    dangerouslySetInnerHTML={{
                      __html: removeHtmlTags(v.description),
                    }}
                  ></p>
                )}
              </div>
            )}
            <hr style={{ margin: "2.5vh 0 2.5vh 0" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
