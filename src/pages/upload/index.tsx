import React from "react";

interface UploadPageProps {
  goNext: (file: File) => void;
}

function UploadPage({ goNext }: UploadPageProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      goNext(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5FDE7]">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">채팅 로그 파일을 업로드 해주세요</h2>
      <div className="relative w-full max-w-lg h-64 p-1 bg-white rounded-xl border border-gray-300">
        <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center">
          <p className="text-gray-500">여기에 파일을 드래그 해주세요</p>
        </div>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default UploadPage;
