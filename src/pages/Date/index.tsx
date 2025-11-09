import { useState } from "react";
import DatePicker from "react-datepicker"; // react-datepicker
import "react-datepicker/dist/react-datepicker.css";

interface DatePageProps {
  goNext: () => void;
  dateRange: { start: string; end: string };
}

function DatePage({ goNext, dateRange }: DatePageProps) {
  const dateText = `${dateRange.start} - ${dateRange.end} 채팅 데이터가 확인되었습니다.`;

  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    null,
  ]);
  const [startDate, endDate] = selectedDateRange;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5FDE7] p-8">
      <p className="text-sm text-gray-500">{dateText}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-2 mb-8">
        날짜의 범위를 설정해주세요.
      </h2>

      <div className="w-full max-w-xs">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setSelectedDateRange(update);
          }}
          inline
          className="w-full"
        />
      </div>

      <button
        onClick={goNext}
        className="mt-8 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        다음
      </button>
    </div>
  );
}

export default DatePage;
