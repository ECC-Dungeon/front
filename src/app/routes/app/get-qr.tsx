import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layouts/page-layout';
import Button from '@/components/ui/button/button.tsx';
import { CircleGradation } from '@/components/ui/gradation/circle-gradation';
import QrPiece from '@/feature/get-qr/components/qr-piece';
import QrPieces from '@/assets/qr-pieces.svg';
import { paths } from '@/config/paths';

export const GetQrRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [clearCount, setClearCount] = useState<number>(0); // クリア済みかけら数
  // const [nextNum, setNextNum] = useState<number | null>(null); // 次のフロア番号

  const [state, setState] = useState<any>(null);

  // 初期化処理
  useEffect(() => {
    try {
      const state =
        typeof location.state === 'string'
          ? JSON.parse(location.state)
          : location.state;

      if (
        state &&
        typeof state === 'object' &&
        'msg' in state &&
        typeof state.msg === 'object' &&
        'NextNum' in state.msg &&
        typeof state.msg.NextNum === 'number'
      ) {
        // state が数値型の場合
        // setNextNum(state);
        setState(state);
        setClearCount(state.msg.CleardFloor.length);
      } else if (state && typeof state === 'object') {
        // state がオブジェクト型の場合
        if (state?.NextNum !== undefined) {
          // setNextNum(state.NextNum);

          // CleardFloorの確認とクリア数の設定
          const clearedFloors = state.CleardFloor ?? []; // CleardFloor が未定義の場合は空配列
          if (Array.isArray(clearedFloors)) {
            setClearCount(clearedFloors.length); // 配列の長さをクリア数として利用
          } else {
            console.error('CleardFloor is not an array:', clearedFloors);
          }
        } else {
          console.error('Invalid state structure:', state);
        }
      } else {
        console.error('Unsupported location.state type:', state);
      }
    } catch (error) {
      console.error('Error parsing location state:', error);
    }
  }, [location.state]);

  // クリア数が3のとき、自動遷移
  useEffect(() => {
    if (clearCount === 3) {
      const timer = setTimeout(() => {
        navigate(paths.app.completedQr.getHref());
      }, 3000);

      return () => clearTimeout(timer); // クリーンアップ
    }
  }, [clearCount, navigate]);

  const handleClick = () => {
    console.log('states-g:', state);
    navigate(paths.app.map.getHref(), {
      replace: true,
      state: state,
    });
  };

  return (
    <PageLayout>
      <div className="relative flex h-full justify-center pt-28 text-center">
        <CircleGradation>
          {clearCount === 3 ? (
            <>
              <div className="font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>全てゲットした!</p>
              </div>
              <div className="mx-auto mt-16 w-72">
                <img src={QrPieces} alt="qr欠片画像" className="w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>ゲットした!</p>
              </div>
              <QrPiece pieceId={clearCount} className="my-12" />
              <div className="font-sans text-xl font-semibold leading-loose text-white">
                <p>鍵が完成するまで</p>
                <p>あと{3 - clearCount}個かけらをゲットしないと</p>
                <p>いけないみたい...</p>
                <Button className="mt-14" onClick={handleClick}>
                  <p>冒険を続ける</p>
                </Button>
              </div>
            </>
          )}
        </CircleGradation>
      </div>
    </PageLayout>
  );
};
