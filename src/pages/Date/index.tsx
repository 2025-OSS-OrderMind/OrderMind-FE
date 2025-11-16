import { useState } from "react";
import DatePicker from "react-datepicker"; // react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

interface DatePageProps {
  goNext: () => void;
  dateRange: { start: string; end: string };
  onDateChange: (date: [Date | null, Date | null]) => void;
  initialDateRange: [Date | null, Date | null];
}

function DatePage({ goNext, dateRange, onDateChange, initialDateRange }: DatePageProps) {
  const dateText = `${dateRange.start} - ${dateRange.end} 채팅 데이터가 확인되었습니다.`;

  const [startDate, setStartDate] = useState<Date | null>(initialDateRange[0]);
  const [endDate, setEndDate] = useState<Date | null>(initialDateRange[1]);

  const handleNext = () => {
    onDateChange([startDate, endDate]);
    goNext();
  };

  const datePickerProps = {
    showTimeSelect: true,
    timeFormat: "HH:mm",
    timeIntervals: 15,
    dateFormat: "yyyy년 MM월 dd일 h:mm aa",
    locale: ko,
    className:
      "w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900", // Tailwind 스타일
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5FDE7] p-8">
      <p className="text-sm text-gray-500">{dateText}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-2 mb-8">
        날짜의 범위를 설정해주세요.
      </h2>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시작 시간</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="시작 날짜 및 시간 선택"
            {...datePickerProps}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">종료 시간</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || undefined}
            placeholderText="종료 날짜 및 시간 선택"
            {...datePickerProps}
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        다음
      </button>
    </div>
  );
}

export default DatePage;
