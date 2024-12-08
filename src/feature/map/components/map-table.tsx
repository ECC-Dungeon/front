import React from 'react';

import TableRow from '@/feature/map/components/table-row';

// 許可されたフロアを型定義とともに明示
const MISSION_FLOORS = [1, 2, 5, 6] as const;
type MissionFloor = (typeof MISSION_FLOORS)[number];

type MapTableProps = {
  floor: MissionFloor; // floor を MissionFloor 型に変更
};

const MapTable: React.FC<MapTableProps> = ({ floor }) => {
  // MissionFloors オブジェクトを初期化
  const MissionFloors: Record<MissionFloor, boolean> = {} as Record<
    MissionFloor,
    boolean
  >;

  // 受け取ったフロアを true に設定
  MissionFloors[floor] = true;

  // tr 要素を動的に生成
  const rows = Object.entries(MissionFloors)
    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // 降順ソート
    .map(([key, isActive]) => {
      const floorNum = parseInt(key) as MissionFloor;
      return <TableRow key={floorNum} floor={isActive ? floorNum : 0} />;
    });

  return <table className="m-auto w-[320px]">{rows}</table>;
};

export default MapTable;
