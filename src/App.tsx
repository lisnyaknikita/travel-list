import { FC, FormEvent, useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 2, packed: false },
];

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🚢 Far Away ✈️</h1>;
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: new Date(), description: description, quantity: quantity, packed: false };

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
}

function PackingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map((item) => (
          <Item key={item.description} item={item} />
        ))}
      </ul>
    </div>
  );
}

interface ItemProps {
  item: {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
  };
}

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

function Stats() {
  return <footer className='stats'>You have X items on your list, and already packed X (X%)</footer>;
}
