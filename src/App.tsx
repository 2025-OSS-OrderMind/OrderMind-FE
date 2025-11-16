import { useState } from "react";
import MainPage from "./pages/index/index";
import TypePage from "./pages/type/index";
import UploadPage from "./pages/upload/index";
import AnalyzingPage from "./pages/Analyzing/index";
import DatePage from "./pages/Date/index";
import ListPage from "./pages/List/index";
import "./App.css";

import type { Item } from "./pages/List/index"; // ListPage의 Item 타입을 import

type Page = "main" | "type" | "upload" | "analyzing" | "date" | "list" | "result"; // 페이지 타입 정의

const parseChatDates = (fileContent: string): { start: string; end: string } | null => {
  const dateRegex = /\d{4}년 \d{1,2}월 \d{1,2}일 (일|월|화|수|목|금|토)요일/g; // 정규표현식
  const matches = fileContent.match(dateRegex); // 파일에서 정규표현식과 일치하는 모든 부분 찾기

  if (!matches || matches.length === 0) {
    // 일치하는 부분이 없으면 null 반환
    return null;
  }

  // 날짜 형식을 "YYYY. M. D."로 변환하는 함수
  const formatDate = (dateString: string) => {
    const parts = dateString.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/); // "YYYY년 M월 D일" 형식에서 연, 월, 일 추출
    if (!parts) return dateString; // 형식이 맞지 않으면 원래 문자열 반환
    return `${parts[1]}. ${parts[2]}. ${parts[3]}.`; // "YYYY. M. D." 형식으로 반환
  };

  // 가장 첫 번째와 마지막 날짜를 시작일과 종료일로 사용
  const startDate = formatDate(matches[0]);
  const endDate = formatDate(matches[matches.length - 1]);

  return { start: startDate, end: endDate };
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("main");
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null); // 날짜 범위 상태 추가

  // 백엔드로 전송할 상태들
  const [chatFile, setChatFile] = useState<File | null>(null); // 파일
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]); // 선택된 날짜
  const [productList, setProductList] = useState<Item[]>([]); // 리스트

  const FileUpload = async (file: File) => {
    // 파일 업로드 처리 함수
    setCurrentPage("analyzing");
    setChatFile(file);

    try {
      const text = await file.text();
      const dates = parseChatDates(text);
      setDateRange(dates);
      setTimeout(() => {
        setCurrentPage("date");
      }, 3000);
    } catch (error) {
      console.error(error);
      setDateRange(null); // 날짜 파싱 실패
      setCurrentPage("date"); // 실패하더라도 다음 페이지로 이동
    }
  };

  const handleSubmit = async () => {
    if (!chatFile || !selectedDateRange[0] || !selectedDateRange[1] || productList.length === 0) {
      alert("모든 정보를 올바르게 입력했는지 확인해주세요.");
      return;
    }

    const transformedItems = productList.map((item) => ({
      name: item.name,
      keywords: item.keyword.split(",").map((k) => k.trim()),
    }));

    const itemData = {
      date_range: {
        start: selectedDateRange[0],
        end: selectedDateRange[1],
      },
      items: transformedItems,
    };

    const formData = new FormData();

    formData.append("file", chatFile);
    formData.append("item_data", JSON.stringify(itemData));

    try {
      const backendApiUrl = `${import.meta.env.VITE_API_URL}/api/upload`;

      const response = await fetch(backendApiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("전송 성공:", result);
      } else {
        alert("서버 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("전송 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const showPage = () => {
    switch (currentPage) {
      case "main":
        return <MainPage goNext={() => setCurrentPage("type")} />;
      case "type":
        return <TypePage goNext={() => setCurrentPage("upload")} />;
      case "upload":
        return <UploadPage goNext={FileUpload} />;
      case "analyzing":
        return <AnalyzingPage />;
      case "date":
        return (
          <DatePage
            goNext={() => setCurrentPage("list")}
            dateRange={dateRange ?? { start: "날짜 없음", end: "날짜 없음" }}
            onDateChange={setSelectedDateRange}
            initialDateRange={selectedDateRange}
          />
        );
      case "list":
        return (
          <ListPage
            onSubmit={handleSubmit}
            onListChange={setProductList}
            initialList={productList}
          />
        );
      default:
        return <MainPage goNext={() => setCurrentPage("type")} />;
    }
  };

  return <>{showPage()}</>;
}

export default App;
