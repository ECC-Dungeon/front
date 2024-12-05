import { useUser } from '@/lib/auth';

import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';
import { ContentLayout } from '@/components/layouts/content-layout';
import ReaderButton from '@/feature/map/components/reader-button.tsx';

export const MapRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return (
    <ContentLayout>
      <div>
        <div className="flex items-center justify-center space-x-12 pb-7 pt-20">
          <div className="text-center text-white">
            <p className="">経過時間</p>
            <div className="text-5xl">
              <Stopwatch />
            </div>
          </div>
          <Progress progress={0} /> {/*進捗が0の場合*/}
        </div>
        <MapTable />
        <div className="mt-10 flex items-center justify-center">
          <ReaderButton />
        </div>
      </div>
    </ContentLayout>
  );
};