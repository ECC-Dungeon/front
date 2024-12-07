import React from 'react';

import TableRow from '@/feature/map/components/table-row';
import { Floor } from '@/types/api';

type MapTableProps = {
  floor: Floor[];
};

// 許可されたフロアを型定義とともに明示
const MISSION_FLOORS = [1, 2, 5, 6] as const;
type MissionFloor = (typeof MISSION_FLOORS)[number];

const MapTable: React.FC<MapTableProps> = ({ floor }) => {
  const MissionFloors: Record<MissionFloor, boolean> = {} as Record<
    MissionFloor,
    boolean
  >;

  floor.map((f) => {
    f.Enabled && (MissionFloors[f.FloorNum as MissionFloor] = f.Enabled);
  });

  console.log(MissionFloors);

  // // 表示階を管理するboolean
  // const MissionFloors: Record<MissionFloor, boolean> = {
  //   1: false,
  //   2: false,
  //   5: false,
  //   6: false,
  // };

  // フロア情報をフィルタリングし、EnabledがtrueのものだけをMissionFloorsに反映
  // floor
  //   .filter(
  //     (f) => f.Enabled && MISSION_FLOORS.includes(f.FloorNum as MissionFloor),
  //   )
  //   .forEach((f) => {
  //     MissionFloors[f.FloorNum as MissionFloor] = true;
  //   });

  // tr 要素を動的に生成
  const rows = Object.entries(MissionFloors)
    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // 降順ソート
    .map(([key]) => {
      const floor = parseInt(key) as MissionFloor;
      return <TableRow key={floor} floor={floor} />;
    });

  return (
    <table className="m-auto w-[320px]">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default MapTable;
