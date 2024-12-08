import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';
import { ContentLayout } from '@/components/layouts/content-layout';
import ReaderButton from '@/feature/map/components/reader-button.tsx';
import { QrScan } from '@/feature/map/components/qr-scan';
// import { paths } from '@/config/paths';
import { postFloor } from '@/feature/floor/api/get-floor';
import Loading from '@/components/ui/loading/loading';

// floor の型を 2 | 1 | 5 | 6 に制限
export const MapRoute = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  const [reader, setReader] = useState(false);
  const [floor, setFloor] = useState<2 | 1 | 5 | 6>(1); // 初期値を `1` に設定
  const [isLoading, setIsLoading] = useState(true);

  const fetchFloorData = useCallback(() => {
    try {
      // `location.stateが存在し、適切な形式であるか確認
      if (
        location.state &&
        location.state.msg &&
        typeof location.state.msg.NextNum === 'number'
      ) {
        const nextNum = location.state.msg.NextNum;

        if ([1, 2, 5, 6].includes(nextNum)) {
          setFloor(nextNum);
        } else {
          console.error('Invalid floor value:', nextNum);
        }
      } else {
        console.error('Invalid location.state structure:', location.state);
      }
    } catch (error) {
      console.error('Error fetching floor data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    fetchFloorData();
  }, [fetchFloorData]);

  const handlePostFloor = () => {
    postFloor(localStorage.getItem('token')?.toString() || '');
  };

  return (
    <ContentLayout>
      <div className="relative">
        <div className="flex items-center justify-center space-x-12 pb-7 pt-20">
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
                className="absolute right-4 top-4 rounded-full bg-gray-700 px-4 py-2 text-white"
                onClick={() => setReader(false)} // 閉じるボタン
              ></button>
              <QrScan
              // onSuccess={() => {
              //   navigate(paths.app.getQr.getHref(), {
              //     replace: true
              //   });
              // }}
              />
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};
