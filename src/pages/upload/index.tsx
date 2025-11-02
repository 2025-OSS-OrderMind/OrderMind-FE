interface UploadPageProps {
  goNext: () => void;
}

function UploadPage({ goNext }: UploadPageProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl mb-10">채팅 로그 파일을 업로드 해주세요</h2>

      {/* 나중에 드래그 앤 드롭 영역이 될 부분 */}
      <div>
        <p>여기에 파일을 드래그 해주세요</p>

        {/* 파일 선택을 담당하는 input 요소 */}
        <input type="file" onChange={goNext} />
      </div>
    </div>
  );
}

export default UploadPage;
