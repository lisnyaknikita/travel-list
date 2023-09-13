import { useState } from 'react';

import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

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

  const onClearList = () => {
    const agreement = confirm('Do you really want to delete everything?');

    agreement && setItems([]);
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={onAddNewItem} />
      <PackingList items={items} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} onClearList={onClearList} />
      <Stats items={items} />
    </div>
  );
}
