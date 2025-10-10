// 가장 첫 화면 (Main Page)
// CSS

interface MainPageProps {
  // 일단 void값으로 빈 함수로 설정 후, 부모(App.tsx)에서 함수를 받는다.
  goNext: () => void;
}

function MainPage({ goNext }: MainPageProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5FDE7]">
      <h1 className="text-3xl text-black mb-8">
        <span className="font-bold text-[#728552]">OrderMind</span>로 채팅 주문 종합하기
      </h1>
      <button
        className="text-[#252525] bg-[#C3F173] border rounded-lg cursor-pointer shadow-md hover:bg-[#c9d68e]"
        onClick={goNext}
      >
        종합 시작하기
      </button>
    </div>
  );
}

export default MainPage;
