import { FC, FormEvent, useState } from 'react';

export default function App() {
  const [items, setItems] = useState<{ id: number; description: string; quantity: number; packed: boolean }[]>([]);

  const onAddNewItem = (newItem: { id: number; description: string; quantity: number; packed: boolean }) => {
    setItems((items) => [...items, newItem]);
  };

  const onDeleteItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={onAddNewItem} />
      <PackingList items={items} onDeleteItem={onDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🚢 Far Away ✈️</h1>;
}

interface FormProps {
  onAddItem: (newItem: { id: number; description: string; quantity: number; packed: boolean }) => void;
}

const Form: FC<FormProps> = ({ onAddItem }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Math.floor(Math.random() * 100 + 1), description: description, quantity: quantity, packed: false };
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type='text' placeholder='Enter the item...' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
};

interface PackingListProps {
  items: { id: number; description: string; quantity: number; packed: boolean }[];
  onDeleteItem: (id: number) => void;
}

const PackingList: FC<PackingListProps> = ({ items, onDeleteItem }) => {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item key={item.description} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
};

interface ItemProps {
  item: {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
  };
  onDeleteItem: (id: number) => void;
}

const Item: FC<ItemProps> = ({ item, onDeleteItem }) => {
  return (
    <li>
      {/* <input type='checkbox' value={item.packed} onChange={() => {}} /> */}
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

function Stats() {
  return <footer className='stats'>You have X items on your list, and already packed X (X%)</footer>;
}
