import { useState } from "react";
import "./App.css";
import ChatBot from "./components/ChatBot";
import chatIcon from "./assets/chatProfile.png";
import { fetchDataFromBackend } from "./api";

import Categories from "./components/Categories";
import Search from "./components/Search";
import MainNews from "./components/MainNews";
import SearchNews from "./components/SearchNews";
import NewsPage from "./components/NewsPage";
import VisitorCounter from "./components/VisitorCounter";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function Main({
  category,
  setCategory,
  newsList,
  search,
  fetchNews,
  showChatBot,
  setShowChatBot,
  messages,
  setMessages,
}) {
  const navigate = useNavigate();

  const handleMainClick = () => {
    setCategory("all");
    navigate("/");
  };

  const handleButtonClick = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="App">
      <div className="header">
        <span onClick={handleMainClick}>NewSearch</span>
        <VisitorCounter />
      </div>
      <div className="container">
        <div className="news">
          <div className="menu">
            <Categories category={category} onCategoryChange={setCategory} />
            <Search onSearch={fetchNews} />
          </div>
          <div className="article">
            <Routes>
              <Route path="/" element={<MainNews category={category} />} />
              <Route
                path="/search"
                element={<SearchNews newsList={newsList} search={search} />}
              />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </div>
        </div>
        <div className="chat">
          {showChatBot && (
            <div className="chatbot-overlay">
              <ChatBot messages={messages} setMessages={setMessages} />
            </div>
          )}
          <div className="divbutton">
            <button
              className={`chatbot-button ${showChatBot ? "active" : ""}`}
              onClick={handleButtonClick}
            >
              <img src={chatIcon} alt="Chat" className="chat-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState("all");
  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNews = async (search) => {
    setSearch(search);
    try {
      const data = await fetchDataFromBackend(`/naver/data?search=${search}`);
      setNewsList(data.items);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const [showChatBot, setShowChatBot] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `안녕하세요! \n저는 gpt4o-mini 기반 챗봇입니다.\n뉴스를 보다가 궁금한 점을 물어보세요!\n(2023년 10월까지의 데이터 기반 답변입니다)`,
    },
  ]);

  return (
    <BrowserRouter>
      <Main
        category={category}
        setCategory={setCategory}
        newsList={newsList}
        search={search}
        fetchNews={fetchNews}
        showChatBot={showChatBot}
        setShowChatBot={setShowChatBot}
        messages={messages}
        setMessages={setMessages}
      />
    </BrowserRouter>
  );
}

export default App;
