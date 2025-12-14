import React, { JSX } from 'react';
import { useFloor } from '@/feature/floor/api/get-floor';
// 0/3 ~ 3/3
import threeZero from 'src/assets/progress/3-0.svg';
import threeOne from 'src/assets/progress/3-1.svg';
import threeTwo from 'src/assets/progress/3-2.svg';
import threeThree from 'src/assets/progress/3-3.svg';
// 0/4 ~ 4/4
import fourZero from 'src/assets/progress/4-0.svg';
import fourOne from 'src/assets/progress/4-1.svg';
import fourTwo from 'src/assets/progress/4-2.svg';
import fourThree from 'src/assets/progress/4-3.svg';
import fourFour from 'src/assets/progress/4-4.svg';
import Loading from '@/components/ui/loading/loading';

// 進捗画像ソースを管理するオブジェクト
// 3段階用
const progressImagesThree: Record<number, string> = {
  0: threeZero,
  1: threeOne,
  2: threeTwo,
  3: threeThree,
};
// 4段階用
const progressImagesFour: Record<number, string> = {
  0: fourZero,
  1: fourOne,
  2: fourTwo,
  3: fourThree,
  4: fourFour,
};

// propsの定義
interface ProgressProps {
  progress?: 0 | 1 | 2 | 3 | 4; //  0,1,2,3,4に制限（省略時は0）
  gameId: string;
}

const Progress: React.FC<ProgressProps> = ({ progress = 0, gameId }) => {
  const { data, isLoading, error } = useFloor({ gameId });
  if (isLoading) {
    return (
      <div className="absolute top-0 w-full text-center text-gray-500">
        <Loading />
      </div>
    );
  }
  // TODO: コンポーネントにする
  if (error) {
    return (
      <div className="absolute top-0 size-full bg-red-50 text-black">
        <span className="flex h-full items-center justify-center">
          階層の取得エラーが発生しました
        </span>
      </div>
    );
  }
  // data?.msgの中の配列のEnabledがtrueの数を数える
  const enabledFloorCount =
    data?.msg.filter((floor) => floor.Enabled).length || 0;

  const progressComponents: Record<number, JSX.Element> = {
    3: <img src={progressImagesThree[progress]} alt="進捗メーター" />,
    4: <img src={progressImagesFour[progress]} alt="進捗メーター" />,
  };

  return (
    progressComponents[enabledFloorCount] || (
      <div className="absolute top-0 size-full bg-red-50 text-black">
        <span className="flex h-full items-center justify-center">
          選択された階層が適切ではありません
          <br />
          階層数は3または4である必要があります
        </span>
      </div>
    )
  );
};

export default Progress;
