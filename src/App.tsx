import { useState } from "react";
// Pages
import MainPage from "./pages/index/index";
import TypePage from "./pages/type/index";
import UploadPage from "./pages/upload/index";
import AnalyzingPage from "./pages/Analyzing/index";
import DatePage from "./pages/Date/index";
import ListPage from "./pages/List/index";
// CSS
import "./App.css";

type Page = "main" | "type" | "upload" | "analyzing" | "date" | "list" | "result";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("main");

  const FileUpload = () => {
    setCurrentPage("analyzing");

    setTimeout(() => {
      setCurrentPage("date");
    }, 3000);
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
        return <DatePage goNext={() => setCurrentPage("list")} />;
      case "list":
        return <ListPage />;

      case "result":
        return <div>결과 페이지 (구현 예정)</div>;

      default:
        return <MainPage goNext={() => setCurrentPage("type")} />;
    }
  };

  return <>{showPage()}</>;
}

export default App;
