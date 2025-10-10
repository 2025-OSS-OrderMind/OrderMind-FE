import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// Pages
import MainPage from "./pages/index/index";
import TypePage from "./pages/type/index";
import UploadPage from "./pages/upload/index";
import AnalyzingPage from "./pages/Analyzing/index";
import DatePage from "./pages/Date/index";
import ListPage from "./pages/List/index";
// CSS
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate(); // useNavigate 훅은 <BrowserRouter> 내부에서만 사용 가능. 따라서 함수 분리함.

  const goNext = (path: string) => {
    navigate(path);
  };

  const temp = () => {}; // 분석페이지에서 분석이 끝난 후 결과 페이지로 이동하는 함수도 필요할 듯.

  return (
    <Routes>
      <Route index path="/" element={<MainPage goNext={() => goNext("/type")} />} />{" "}
      {/* 받는 값이 함수라서 {"/type"} 이런식으로 주면 오류가 발생함. 함수 형태로 전달함. */}
      <Route path="/type" element={<TypePage goNext={() => goNext("/upload")} />} />
      <Route path="/upload" element={<UploadPage goNext={temp} />} />{" "}
      {/* 업로드 페이지에서는 다음 페이지로 이동하는 버튼이 없음 */}
      <Route path="/analyzing" element={<AnalyzingPage />} />{" "}
      {/* 분석중 페이지에서는 다음 페이지로 이동하는 버튼이 없음 */}
      <Route path="/result" element={<div>결과 페이지 (구현 예정)</div>} />
      <Route path="/date" element={<DatePage goNext={() => {}} />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
