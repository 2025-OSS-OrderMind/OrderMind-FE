function ResultPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5FDE7] p-8">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 mt-6 mb-2">전송 완료!</h2>
        <p className="text-xl text-gray-800">데이터 분석 요청이 성공적으로 접수되었습니다.</p>

        <div className="border-t border-gray-200 my-6"></div>

        <p className="text-md text-gray-500 mt-4">
          분석이 완료되면 입력하신 이메일로 알려드립니다.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
        >
          새로 시작하기
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
