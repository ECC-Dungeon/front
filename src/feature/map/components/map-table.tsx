import React from 'react';
import { TableRow } from '@/feature/map/components/table-row';

interface MapTableProps {
  floor?: 1 | 2 | 3 | 4 | 5 | 6;
  clearedFloors?: number[];
}

const MapTable: React.FC<MapTableProps> = ({
  floor: currentFloor = 1,
  clearedFloors = [],
}) => {
  // 表示階を管理するboolean
  const MissionFloors: Record<number, boolean> = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };

  // 受け取った階をtrueにする
  MissionFloors[currentFloor] = true;
  // tr要素を動的に生成
  const rows = [];
  for (let key in MissionFloors) {
    const floor = parseInt(key) as 1 | 2 | 3 | 4 | 5 | 6;
    const isCleared = clearedFloors.includes(floor);

    if (MissionFloors[floor]) {
      rows.unshift(
        <TableRow key={floor} floor={floor} isCleared={isCleared} />,
      );
    } else if (isCleared) {
      // クリア済みの場合も行を追加
      rows.unshift(
        <TableRow key={floor} floor={floor} isCleared={isCleared} />,
      );
    } else {
      // false の場合はダミーを追加
      rows.unshift(<TableRow key={`dummy-${floor}`} floor={0} />);
    }
  }

  return (
    <table className="m-auto w-3/4">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default MapTable;
