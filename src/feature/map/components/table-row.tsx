import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import missionImage1 from 'src/assets/pic-mission.svg'; //  仮の画像

// 各階の説明と画像ソースを設定
const MissionData: Record<number, { description: string; imageSrc: string }> = {
  1: { description: '1F 宝箱', imageSrc: missionImage1 },
  2: { description: '2F ??????', imageSrc: missionImage1 },
  5: { description: '5F ??????', imageSrc: missionImage1 },
  6: { description: '6F ??????', imageSrc: missionImage1 },
};

// 許可されたフロアの定義
const MISSION_FLOORS = [1, 2, 5, 6] as const;
type MissionFloor = (typeof MISSION_FLOORS)[number];

// propsを定義
interface TableRowProps extends VariantProps<typeof TableRowVariants> {
  floor: MissionFloor;
}

// 各階の背景色を設定
export const TableRowVariants = cva(
  `w-1/2 p-1 text-white text-2xl text-left align-top`,
  {
    variants: {
      floor: {
        1: 'bg-[#7A2D83]',
        2: 'bg-[#833B2D]',
        5: 'bg-[#63832D]',
        6: 'bg-[#624541]',
      },
    },
    defaultVariants: {
      floor: 1,
    },
  },
);

const TableRow: React.FC<TableRowProps> = ({ floor = 1 }) => {
  const mission = MissionData[floor];

  return (
    <tr>
      <td className={TableRowVariants({ floor })}>{mission.description}</td>
      <td className="w-1/2">
        <img src={mission.imageSrc} alt="ミッション画像" />
      </td>
    </tr>
  );
};

export default TableRow;
