import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { useNavigate } from 'react-router-dom';

// 背景画像のインポート
import brown from '@/assets/floor1-bg.png';
import green from '@/assets/floor2-bg.png';
import red from '@/assets/floor5-bg.png';
import purple from '@/assets/floor6-bg.png';
// マップ画像のインポート
import first from '@/assets/floor1-map.png';
import second from '@/assets/floor2-map.png';
import fifth_sixth from '@/assets/floor5_6-map.png';

// 各階の説明と画像ソースを設定
const MissionData: Record<number, { description: string }> = {
  1: { description: '1F' },
  2: { description: '2F' },
  5: { description: '5F' },
  6: { description: '6F' },
};

const floors: Record<
  number,
  { id: number; name: string; background: string; floorMap: string }
> = {
  1: { id: 1, name: '１階', background: brown, floorMap: first },
  2: { id: 2, name: '２階', background: green, floorMap: second },
  5: { id: 5, name: '５階', background: red, floorMap: fifth_sixth },
  6: { id: 6, name: '６階', background: purple, floorMap: fifth_sixth },
};

// 許可されたフロアの定義
const MISSION_FLOORS = [1, 2, 5, 6] as const;
type MissionFloor = (typeof MISSION_FLOORS)[number];

// propsを定義
interface TableRowProps extends VariantProps<typeof TableRowVariants> {
  floor: MissionFloor;
  className?: string;
}

// 各階の背景色を設定
export const TableRowVariants = cva(
  `text-white text-3xl font-semibold text-center`,
  {
    variants: {
      floor: {
        1: 'bg-[#62454180]',
        2: 'bg-[#63832D80]',
        5: 'bg-[#833B2D80]',
        6: 'bg-[#7A2D8380]',
      },
    },
    defaultVariants: {
      floor: 1,
    },
  },
);

const TableRow: React.FC<TableRowProps> = ({ floor = 1, className }) => {
  const mission = MissionData[floor];
  const navigate = useNavigate();

  // 各階の詳細画面に遷移
  const handleRowClick = () => {
    navigate('/app/floor', { state: floors[floor] });
  };

  return (
    <tr onClick={handleRowClick} className={`h-32 ${className}`}>
      <td className={TableRowVariants({ floor })}>{mission.description}</td>
    </tr>
  );
};

export default TableRow;
