import { useState } from "react";
import MainPage from "./pages/index/index";
import TypePage from "./pages/type/index";
import UploadPage from "./pages/upload/index";
import AnalyzingPage from "./pages/Analyzing/index";
import DatePage from "./pages/Date/index";
import ListPage from "./pages/List/index";
import "./App.css";

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

  const FileUpload = async (file: File) => {
    // 파일 업로드 처리 함수
    setCurrentPage("analyzing");

    try {
      // 파일 읽기
      const text = await file.text();
      const dates = parseChatDates(text);
      setDateRange(dates);

      setTimeout(() => {
        setCurrentPage("date");
      }, 3000);
    } catch (error) {
      // 오류 처리
      console.error(error);
      setDateRange(null);
      setCurrentPage("date");
    }
  };

  // 현재 페이지에 따라 적절한 컴포넌트를 렌더링하는 함수
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
          />
        );
      case "list":
        return <ListPage />;
      default:
        return <MainPage goNext={() => setCurrentPage("type")} />;
    }
  };

  return <>{showPage()}</>;
}

export default App;
