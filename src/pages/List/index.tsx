import { useState } from "react";

interface Item {
  id: number;
  name: string;
  keyword: string;
}

function ListPage() {
  const [items, setItems] = useState<Item[]>([{ id: 1, name: "", keyword: "" }]);

  const AddItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: "",
      keyword: "",
    };
    setItems([...items, newItem]);
  };

  const RemoveItem = (Removeid: number) => {
    setItems(items.filter((item) => item.id !== Removeid));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-semibold mb-10">상품 리스트를 작성해주세요</h2>

      <button onClick={AddItem}>+</button>

      {items.map((item, index) => (
        <div key={item.id}>
          <span>{index + 1}</span>

          <button onClick={() => RemoveItem(item.id)}>-</button>

          <input type="text" placeholder="상품 이름" />
          <input type="text" placeholder="키워드" />
        </div>
      ))}

      <button>다음</button>
    </div>
  );
}

export default ListPage;
