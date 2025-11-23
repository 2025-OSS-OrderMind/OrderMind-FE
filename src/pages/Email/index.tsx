import { useState, useEffect } from "react";

interface EmailPageProps {
  onSubmit: () => void;
  onEmailChange: (email: string) => void;
  initialEmail: string;
}

function EmailPage({ onSubmit, onEmailChange, initialEmail }: EmailPageProps) {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    onEmailChange(email);
  }, [email, onEmailChange]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FDE7] p-8">
      <main className="flex-grow flex flex-col items-center pt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-12">
          결과를 받을 이메일을 입력하세요
        </h2>
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-600 mb-2">
            채팅 분석이 완료되면 해당 이메일로 알림을 보내드립니다.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900"
          />
        </div>
      </main>
      <footer className="flex justify-end">
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          최종 전송하기
        </button>
      </footer>
    </div>
  );
}

export default EmailPage;
