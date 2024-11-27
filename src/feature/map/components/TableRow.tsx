import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import missionImage1 from 'src/assets/pic-mission.svg'; //  仮の画像

// 各階の画像ソースを管理するオブジェクト
const MissionImageSrc: Record<number, string> = {
  1: missionImage1,
  2: missionImage1,
  5: missionImage1,
  6: missionImage1,
};

// 各階の説明文を管理するオブジェクト
const MissionDescription: Record<number, string> = {
  1: '1F 宝箱',
  2: '2F ??????',
  5: '5F ??????',
  6: '6F ??????',
};

// props を定義
interface TableRowProps extends VariantProps<typeof TableRowVariants> {
  floor: 1 | 2 | 5 | 6; //  ミッションの階を制限
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
  return (
    <tr>
      <td className={TableRowVariants({ floor })}>
        {MissionDescription[floor]}
      </td>
      <td className="w-1/2">
        <img src={MissionImageSrc[floor]} alt="ミッション画像" />
      </td>
    </tr>
  );
};

export default TableRow;
