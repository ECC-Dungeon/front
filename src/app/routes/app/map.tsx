import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';
import { ContentLayout } from '@/components/layouts/content-layout';
import ReaderButton from '@/feature/map/components/reader-button.tsx';
import { QrScan } from '@/feature/login/components/qr-scan';
import { paths } from '@/config/paths';
import { getFloor } from '@/feature/floor/api/get-floor';
import { Floor } from '@/types/api';

export const MapRoute = () => {
  const navigate = useNavigate();

  const [reader, setReader] = useState(false);
  const [floor, setFloor] = useState<Floor[]>([]);

  useEffect(() => {
    getFloor('test').then((res) => {
      setFloor(res.name);
    });
  }, []);

  return (
    <ContentLayout>
      <div className="relative">
        <div className="flex items-center justify-center space-x-12 pb-7 pt-20">
          <div className="text-center text-white">
            <p className="">経過時間</p>
            <div className="text-5xl">
              <Stopwatch />
            </div>
          </div>
          <Progress progress={0} /> {/*進捗が0の場合*/}
        </div>
        <MapTable floor={floor} />
        <div className="mt-10 flex items-center justify-center">
          <ReaderButton onClick={() => setReader(true)} />
        </div>
        {reader && (
          <div className="absolute top-0 h-svh w-full bg-black">
            <div className="flex h-full items-center justify-center">
              <QrScan
                onSuccess={() => {
                  navigate(paths.app.getQr.getHref(), {
                    replace: true,
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};
