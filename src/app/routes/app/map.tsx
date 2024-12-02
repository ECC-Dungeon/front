import { useUser } from '@/lib/auth';
import { Link } from 'react-router-dom';
// 背景画像のインポート
import brown from '@/assets/floor1-bg.png';
import green from '@/assets/floor2-bg.png';
import red from '@/assets/floor5-bg.png';
import purple from '@/assets/floor6-bg.png';
// マップ画像のインポート
import first from '@/assets/floor1-map.png';
import second from '@/assets/floor2-map.png';
import fifth_sixth from '@/assets/floor5_6-map.png';


const floors = [
  {
    id: 1,
    name: '１階',
    background: brown,
    floorMap: first
  },
  {
    id: 2,
    name: '２階',
    background: green,
    floorMap: second
  },
  {
    id: 5,
    name: '５階',
    background: red,
    floorMap: fifth_sixth
  },
  {
    id: 6,
    name: '６階',
    background: purple,
    floorMap: fifth_sixth
  },
] as const;

export const MapRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return (
    <div className='flex flex-col'>
      {floors.map((floor) => (
        <Link 
          key={floor.id} 
          to="/app/floor" 
          state={{ floor }}
        >
          {floor.name}
        </Link>
      ))}
    </div>
  );
};