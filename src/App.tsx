import { FC, FormEvent, useState } from 'react';

export default function App() {
  const [items, setItems] = useState<{ id: number; description: string; quantity: number; packed: boolean }[]>([]);

  const onAddNewItem = (newItem: { id: number; description: string; quantity: number; packed: boolean }) => {
    setItems((items) => [...items, newItem]);
  };

  const onDeleteItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const onToggleItem = (id: number) => {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={onAddNewItem} />
      <PackingList items={items} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
      <Stats items={items} />
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
  onToggleItem: (id: number) => void;
}

const PackingList: FC<PackingListProps> = ({ items, onDeleteItem, onToggleItem }) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems: { id: number; description: string; quantity: number; packed: boolean }[] = [];

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.description} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
      </div>
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
  onToggleItem: (id: number) => void;
}

const Item: FC<ItemProps> = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input type='checkbox' checked={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

interface StatsProps {
  items: {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
  }[];
}

const Stats: FC<StatsProps> = ({ items }) => {
  const itemsQuantity = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((itemsPacked / itemsQuantity) * 100);

  if (!items.length) {
    return <footer className='stats'>Start adding some items to your packing list</footer>;
  }

  return (
    <footer className='stats'>
      {packedPercentage === 100
        ? 'You got everything! Ready to go 🛫'
        : `You have ${itemsQuantity} items on your list, and already packed ${itemsPacked} (${packedPercentage}%)`}
    </footer>
  );
};
