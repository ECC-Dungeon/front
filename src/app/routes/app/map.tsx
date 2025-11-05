import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';
import { ContentLayout } from '@/components/layouts/content-layout';
import ReaderButton from '@/feature/map/components/reader-button.tsx';
import { QrScan } from '@/feature/map/components/qr-scan';
import { postFloor } from '@/feature/floor/api/get-floor';
import Loading from '@/components/ui/loading/loading';

export const MapRoute = () => {
  const location = useLocation();
  const [reader, setReader] = useState<boolean>(false);
  const [floor, setFloor] = useState<1 | 2 | 5 | 6>(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // フロア番号を設定（location.stateから取得）
  useEffect(() => {
    // location.stateからデータを取得（QR読み取り後の遷移の場合）
    const state = location.state as any;
    if (
      state &&
      typeof state === 'object' &&
      'msg' in state &&
      state.msg &&
      typeof state.msg === 'object' &&
      'NextNum' in state.msg &&
      typeof state.msg.NextNum === 'number'
    ) {
      const nextNum = state.msg.NextNum;
      if ([1, 2, 5, 6].includes(nextNum)) {
        setFloor(nextNum as 1 | 2 | 5 | 6);
      }
    }

    // ローディング終了
    setIsLoading(false);
  }, [location.state]);

  const handlePostFloor = () => {
    postFloor(localStorage.getItem('token')?.toString() || '');
  };

  return (
    <ContentLayout>
      <div className="relative">
        <div className="flex items-center justify-center space-x-12 pt-20 pb-7">
          <div className="text-center text-white">
            <p className="" onClick={handlePostFloor}>
              経過時間
            </p>
            <div className="text-5xl">
              <Stopwatch />
            </div>
          </div>
          <Progress progress={0} />
        </div>
        {isLoading ? (
          <div className="absolute top-0 text-white">
            <Loading />
          </div>
        ) : (
          <MapTable floor={floor} />
        )}
        <div className="mt-10 flex items-center justify-center">
          <ReaderButton onClick={() => setReader(true)} />
        </div>
        {reader && (
          <div className="absolute top-0 h-svh w-full bg-black">
            <div className="relative flex h-full items-center justify-center">
              <button
                className="absolute top-4 right-4 rounded-full bg-gray-700 px-4 py-2 text-white"
                onClick={() => setReader(false)} // 閉じるボタン
              >
                閉じる
              </button>
              <QrScan />
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};
