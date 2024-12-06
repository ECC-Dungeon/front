import { useState } from 'react';

import { ContentLayout } from '@/components/layouts/content-layout';
import Button from '@/components/ui/button/button';
import { useNavigate } from 'react-router-dom';

export const ExplanationRoute = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState<boolean>(false); // ゲームが開始しているかどうかの状態
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false); // クリックされたかどうかの状態
  // TODO:ゲームが開始しているかどうかの判定を追加する
  // useEffect(() => {
  //   // TODO:仮置き
  //   // const res = await fetch('https://api.example.com');
  //   if (true) {
  //    navigate('/app/map', { replace: true });
  //   }
  // }, []);

  const handleClick = async () => {
    // const res = await fetch('https://api.example.com');
    if (true) {
      setIsStart(true);
      navigate('/app/map', { replace: true });
    } else {
      setIsFirstClick(true);
    }
  };

  return (
    <ContentLayout>
      <div className="h-screen bg-[radial-gradient(circle_at_center,_#323232cc_0%,_#323232ff_100%)]">
        <div className="mx-9 flex h-full flex-col items-center justify-center space-y-44 text-white">
          <div className="space-y-9 text-center">
            <p className="text-2xl">ECCダンジョンへようこそ</p>
            <p className="leading-12 text-xl">
              ここは古代の知識と謎が詰まった地下迷宮です。無数の試練と強敵が冒険者たちを待ち受けますが、その先には貴重な財宝と知恵が待っています。慎重な計画と迅速な判断を駆使して、ダンジョンの最奥を目指してください。
            </p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            {!isStart && isFirstClick && (
              <div className="text-[#FAFAFA]/50">
                開始までしばらくお待ち下さい...
              </div>
            )}
            <Button label="START" onClick={() => handleClick()} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

/**'
 * 後で消す
 * 説明用のフ'ァイル
 */
