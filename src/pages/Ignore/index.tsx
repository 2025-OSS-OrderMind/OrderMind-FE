import { useState, useEffect } from "react";

interface IgnorePageProps {
  goNext: () => void;
  onIgnoreListChange: (list: string) => void;
  initialIgnoreList: string;
}

function IgnorePage({ goNext, onIgnoreListChange, initialIgnoreList }: IgnorePageProps) {
  const [ignoreList, setIgnoreList] = useState(initialIgnoreList);

  useEffect(() => {
    onIgnoreListChange(ignoreList);
  }, [ignoreList, onIgnoreListChange]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FDE7] p-8">
      <main className="flex-grow flex flex-col items-center pt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-12">무시할 상품을 작성해주세요</h2>
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-600 mb-2">
            채팅 로그에서 주문으로 집계되지 않아야 할 단어들을 쉼표(,)로 구분하여 입력해주세요.
          </p>
          <input
            type="text"
            value={ignoreList}
            onChange={(e) => setIgnoreList(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900"
          />
        </div>
      </main>
      <footer className="flex justify-end">
        <button
          onClick={goNext}
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          다음
        </button>
      </footer>
    </div>
  );
}

export default IgnorePage;
