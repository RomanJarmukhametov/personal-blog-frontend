import Image from 'next/image';
import { getIcon } from '@/components/atoms/MenuItemIcon/MenuItemIcon';

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      {getIcon({ name: 'home' })}
    </div>
  );
}
