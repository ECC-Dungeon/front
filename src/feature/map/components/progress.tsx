import React from 'react';
import { useFloor } from '@/feature/floor/api/get-floor';
import Loading from '@/components/ui/loading/loading';
import { ProgressMeter } from './progress-meter';

interface ProgressProps {
  progress?: 0 | 1 | 2 | 3 | 4;
  gameId: string;
}

// 階層数が有効な範囲（1-6）かを型ガードで判定
const isValidFloorCount = (count: number): count is 1 | 2 | 3 | 4 | 5 | 6 => {
  return count >= 1 && count <= 6;
};

// 進捗表示のコンテナコンポーネント
const Progress: React.FC<ProgressProps> = ({ progress = 0, gameId }) => {
  const { data, isLoading, error } = useFloor({ gameId });

  if (isLoading) {
    return (
      <div className="absolute top-0 w-full text-center text-gray-500">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-0 size-full bg-red-50 text-black">
        <span className="flex h-full items-center justify-center">
          階層の取得エラーが発生しました
        </span>
      </div>
    );
  }

  const enabledFloorCount =
    data?.msg.filter((floor) => floor.Enabled).length || 0;

  if (!isValidFloorCount(enabledFloorCount)) {
    return (
      <div className="absolute top-0 size-full bg-red-50 text-black">
        <span className="flex h-full items-center justify-center">
          選択された階層が適切ではありません
          <br />
          階層数は1から6である必要があります
        </span>
      </div>
    );
  }

  return <ProgressMeter current={progress} total={enabledFloorCount} />;
};

export default Progress;


