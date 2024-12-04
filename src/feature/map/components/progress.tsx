import React from 'react';
import progress0 from 'src/assets/progress0.svg';
import progress1 from 'src/assets/progress1.svg';
import progress2 from 'src/assets/progress2.svg';
import progress3 from 'src/assets/progress3.svg';

// 進捗画像ソースを管理するオブジェクト
const progressImages: Record<number, string> = {
  0: progress0,
  1: progress1,
  2: progress2,
  3: progress3,
};

// propsの定義
interface ProgressProps {
  progress: 0 | 1 | 2 | 3; //  0,1,2,3に制限
}

const Progress: React.FC<ProgressProps> = ({ progress = 0 }) => {
  return <img src={progressImages[progress]} alt="進捗メーター" />;
};

export default Progress;
