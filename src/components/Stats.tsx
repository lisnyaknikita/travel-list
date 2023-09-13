import { FC } from 'react';

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

export default Stats;
