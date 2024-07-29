import React, { useEffect, useState } from "react";
import { fetchDataFromBackend } from "../api";

const VisitorCounter = () => {
  const [todayVisitor, setTodayVisitor] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState(0);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const data = await fetchDataFromBackend("/update-visitor-count", {
          method: "POST",
          credentials: "include", // 세션 쿠키를 포함한 요청
        });
        console.log("Fetched data:", data); // 데이터 로그 추가
        setTodayVisitor(data.todayVisitor);
        setTotalVisitor(data.totalVisitor);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <table style={{ fontSize: "2vmin" }}>
      <tbody>
        <tr>
          <td>Today</td>
          <td>: {todayVisitor}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>: {totalVisitor}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default VisitorCounter;
