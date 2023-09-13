import { FC, useState } from 'react';
import Item from './Item';

interface PackingListProps {
  items: { id: number; description: string; quantity: number; packed: boolean }[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
}

const PackingList: FC<PackingListProps> = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
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
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
};

export default PackingList;
