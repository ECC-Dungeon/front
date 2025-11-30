import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layouts/page-layout';
import Button from '@/components/ui/button/button.tsx';
import { CircleGradation } from '@/components/ui/gradation/circle-gradation';
import QrPiece from '@/feature/get-qr/components/qr-piece';
import QrPieces from '@/assets/qr-pieces.svg';
import { paths } from '@/config/paths';
import { useFloor } from '@/feature/floor/api/get-floor';
import Loading from '@/components/ui/loading/loading';

export const GetQrRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // ローカルストレージからゲームIDを取得
  const gameId = localStorage.getItem('gameId') || '';

  const [clearCount, setClearCount] = useState<number>(0); // クリア済みかけら数
  // const [nextNum, setNextNum] = useState<number | null>(null); // 次のフロア番号

  const [state, setState] = useState<any>(null);

  // TODO: この辺もカスタムフックにまとめたい
  // front/src/feature/map/components/progress.tsxでも使用している
  const { data, isLoading, error } = useFloor({ gameId });

  // data?.msgの中の配列のEnabledがtrueの数を数える
  const enabledFloorCount =
    data?.msg.filter((floor) => floor.Enabled).length || 0;

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

  // クリア数がenabledFloorCount(使用された全階層数)のとき、自動遷移
  useEffect(() => {
    if (clearCount === enabledFloorCount) {
      const timer = setTimeout(() => {
        navigate(paths.app.completedQr.getHref());
      }, 3000);

      return () => clearTimeout(timer); // クリーンアップ
    }
  }, [clearCount, navigate]);

  const handleClick = () => {
    navigate(paths.app.map.getHref(), {
      replace: true,
      state: state,
    });
  };

  // ローディング中
  if (isLoading) {
    return (
      <PageLayout>
        <div className="absolute top-0 w-full text-center text-gray-500">
          <Loading />
        </div>
      </PageLayout>
    );
  }

  // エラー時
  if (error) {
    return (
      <PageLayout>
        <div className="absolute top-0 size-full bg-red-50 text-black">
          <span className="flex h-full items-center justify-center">
            階層の取得エラーが発生しました
          </span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="h-screen">
        <CircleGradation>
          {clearCount === enabledFloorCount ? (
            <>
              <div className="text-center font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>全てゲットした!</p>
              </div>
              <div className="mx-auto mt-16 w-72">
                <img src={QrPieces} alt="qr欠片画像" className="w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="text-center font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>ゲットした!</p>
              </div>
              <QrPiece pieceId={clearCount} className="my-12" />
              <div className="text-center font-sans text-xl leading-loose font-semibold text-white">
                <p>鍵が完成するまで</p>
                <p>
                  あと{enabledFloorCount - clearCount}個かけらをゲットしないと
                </p>
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

/**
 * 後で消す
 * このファイルでqrコードのかけらを取得した時の画面を表示する
 * 完成した瞬間(enabledFloorCount(使用された全階層数)つ揃った時)はここでその画面を表示したのちにcompleted-qrに遷移する
 */
