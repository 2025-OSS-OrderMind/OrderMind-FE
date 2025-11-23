import { useState, useEffect } from "react";

export interface Item {
  id: number;
  name: string;
  keyword: string;
}

interface ListPageProps {
  goNext: () => void;
  onListChange: (items: Item[]) => void;
  initialList: Item[];
}

function ListPage({ goNext, onListChange, initialList }: ListPageProps) {
  const [items, setItems] = useState<Item[]>(() => {
    if (initialList.length > 0) {
      return initialList;
    }
    return [{ id: Date.now(), name: "", keyword: "" }];
  });

  useEffect(() => {
    onListChange(items);
  }, [items, onListChange]);

  const AddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      name: "",
      keyword: "",
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (id: number, field: "name" | "keyword", value: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const RemoveItem = (Removeid: number) => {
    setItems(items.filter((item) => item.id !== Removeid));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FDE7] p-8">
      <main className="flex-grow flex flex-col items-center pt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-12">상품 리스트를 작성해주세요</h2>

        <div className="w-full max-w-md flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3">
              {index === 0 ? (
                <button
                  onClick={AddItem}
                  className="w-7 h-7 rounded-full flex justify-center items-center bg-green-500 text-white text-xl font-light hover:bg-green-600 transition-colors shrink-0"
                >
                  +
                </button>
              ) : (
                <button
                  onClick={() => RemoveItem(item.id)}
                  className="w-7 h-7 rounded-full flex justify-center items-center bg-orange-500 text-white text-xl font-light hover:bg-orange-600 transition-colors shrink-0"
                >
                  -
                </button>
              )}
              <span className="text-gray-600 font-medium w-6 text-center">{index + 1}</span>
              <input
                type="text"
                placeholder="상품 이름"
                value={item.name}
                onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                className="px-4 py-1.5 border border-gray-300 bg-gray-50 rounded-full text-sm w-full focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900"
              />
              <input
                type="text"
                placeholder="키워드 (쉼표,로 구분)"
                value={item.keyword}
                onChange={(e) => handleItemChange(item.id, "keyword", e.target.value)}
                className="px-4 py-1.5 border border-gray-300 bg-gray-50 rounded-full text-sm w-full focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900"
              />
            </div>
          ))}
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

export default ListPage;
