interface DatePageProps {
  goNext: () => void;
}

function DatePage({ goNext }: DatePageProps) {
  return (
    <div>
      <p>20XX년 XX월 XX일 XX:XX - 20XX년 XX월 XX일 XX:XX 채팅 데이터가 확인되었습니다.</p>

      <h2>날짜의 범위를 설정해주세요.</h2>

      {/* 라이브러리가 들어갈 자리 */}
      <div>날짜 설정 창</div>

      <button onClick={goNext}>다음</button>
    </div>
  );
}

export default DatePage;
