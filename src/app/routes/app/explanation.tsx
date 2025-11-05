import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStatus } from '@/lib/game-status';
import { ContentLayout } from '@/components/layouts/content-layout';
import Button from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { useNextFloor } from '@/lib/next';

export const ExplanationRoute = () => {
  const navigate = useNavigate();
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false); // クリックされたかどうかの状態
  const data = useGameStatus();

  const nextFloor = useNextFloor({
    mutationConfig: {
      onSuccess: (response) => {
        if (response?.msg) {
          const nextNum = response.msg.NextNum;
          console.log(`NextNum: ${nextNum}`);
        } else {
          console.error('Response structure is incorrect or undefined');
        }
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    },
  });

  useEffect(() => {
    if (data.data?.result === 'success') {
      navigate(paths.app.map.getHref(), { replace: true });
    }
  }, [data.data, navigate]);

  // ボタンが押された時の処理
  const handleClick = async () => {
    if (data.data?.result === 'success') {
      try {
        // mutateAsyncを使って非同期処理を待機
        const next = await nextFloor.mutateAsync({
          data: { clear_floor: -1 },
        });

        // mutateAsync の結果を state に渡して遷移
        navigate('/app/map', { replace: true, state: next });
      } catch (error) {
        console.error('Error during floor mutation:', error);
      }
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
            {isFirstClick && (
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
