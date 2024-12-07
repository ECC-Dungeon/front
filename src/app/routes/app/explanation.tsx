import { useEffect, useState } from 'react';

import { ContentLayout } from '@/components/layouts/content-layout';
import Button from '@/components/ui/button/button';
import { useNavigate } from 'react-router-dom';
import { useGameStatus } from '@/lib/game-status';

export const ExplanationRoute = () => {
  const navigate = useNavigate();
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false); // クリックされたかどうかの状態

  // React Query でゲームステータスを取得
  const { data, isLoading } = useGameStatus();

  useEffect(() => {
    // ステータスを監視し、ゲーム開始時にページ遷移
    if (data?.data?.result === 'success') {
      navigate('/app/map', { replace: true });
    }
  }, [data, navigate]);

  const handleClick = () => {
    // ボタンが押された時の処理
    if (data?.data?.result === 'success') {
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
            <p className="text-xl leading-12">
              ここは古代の知識と謎が詰まった地下迷宮です。無数の試練と強敵が冒険者たちを待ち受けますが、その先には貴重な財宝と知恵が待っています。慎重な計画と迅速な判断を駆使して、ダンジョンの最奥を目指してください。
            </p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            {isFirstClick && !isLoading && (
              <div className="text-[#FAFAFA]/50">
                開始までしばらくお待ち下さい...
              </div>
            )}
            <Button children="START" onClick={handleClick} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

/**'
 * 後で消す
 * 説明用のファイル
 */
