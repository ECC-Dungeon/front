import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { useNavigate } from 'react-router-dom';

// 各階の説明を設定 0はダミー用
const MissionData: Record<number, { description: string }> = {
  0: { description: '' },
  1: { description: '1F' },
  2: { description: '2F' },
  5: { description: '5F' },
  6: { description: '6F' },
};

// 許可されたフロアの定義
const MISSION_FLOORS = [0, 1, 2, 5, 6] as const;
type MissionFloor = (typeof MISSION_FLOORS)[number];

// propsを定義
interface TableRowProps extends VariantProps<typeof TableRowVariants> {
  floor?: MissionFloor;
  className?: string;
}

// 各階の背景色を設定0はダミー用
export const TableRowVariants = cva(
  `text-white text-3xl font-semibold text-center`,
  {
    variants: {
      floor: {
        0: 'bg-[#A3A3A333]',
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

const TableRow: React.FC<TableRowProps> = ({ floor = 0, className }) => {
  const mission = MissionData[floor];
  const navigate = useNavigate();

  // 各階の詳細画面に遷移
  const handleRowClick = () => {
    if (floor == 0) return; //  0の時画面遷移しない
    navigate('/app/floor', { state: { id: floor } });
  };

  return (
    <tr onClick={handleRowClick} className={`h-32 ${className}`}>
      <td className={TableRowVariants({ floor })}>{mission.description}</td>
    </tr>
  );
};

export default TableRow;
