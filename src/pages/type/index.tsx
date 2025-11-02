import kakaotalk_logo from "../../assets/kakaotalk_logo.png";

interface TypePageProps {
  goNext: () => void;
}

function TypePage({ goNext }: TypePageProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F5FDE7]">
      <h2 className="text-3xl font-semibold text-black mb-8">채팅 유형을 골라주세요</h2>

      <div className="flex gap-5">
        <button
          className="flex flex-col justify-center items-center w-40 h-40 bg-[#C3F173] border"
          onClick={goNext}
        >
          <img className="w-12 h-12 mb-1" src={kakaotalk_logo} alt="kakaotalk" />
          <span className="text-black">카카오톡</span>
        </button>

        <button className="flex flex-col justify-center items-center w-40 h-40 bg-[#DFE6D3] border">
          <span className="mb-5">+</span>
          <span className="text-black">추가 별도 문의</span>
        </button>
      </div>
    </div>
  );
}

export default TypePage;
