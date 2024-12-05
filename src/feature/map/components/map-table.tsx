import React from 'react';
import TableRow from '@/feature/map/components/table-row';

const MapTable: React.FC = () => {
  // 表示階を管理するboolean
  const MissionFloors: Record<number, boolean> = {
    1: false,
    2: false,
    5: false,
    6: false,
  };

  const MissionFloor = 1; //  仮で設定 1,2,5,6以外を受け取るとエラー出る
  MissionFloors[MissionFloor] = true; //  受け取った階をtrueにする

  // tr要素を動的に生成
  const rows = [];
  for (let key in MissionFloors) {
    const floor = parseInt(key);
    if (MissionFloors[floor]) {
      rows.unshift(<TableRow floor={floor} />);
    } else {
      //  falseの時ダミーを表示
      rows.unshift(<TableRow floor={0} />);
    }
  }

  return <table className="m-auto w-[320px]">{rows}</table>;
};

export default MapTable;
