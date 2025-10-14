import { useNavigate } from 'react-router-dom';
import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';
import { ContentLayout } from '@/components/layouts/content-layout';
import ReaderButton from '@/feature/map/components/reader-button.tsx';
import { paths } from '@/config/paths';

export const MapRoute = () => {
  const navigate = useNavigate();

  const handleReaderClick = () => {
    navigate(paths.app.getQr.getHref());
  };

  return (
    <ContentLayout>
      <div className="flex items-center justify-center space-x-12 pt-20 pb-7">
        <div className="text-center text-white">
          <p className="">経過時間</p>
          <div className="text-5xl">
            <Stopwatch />
          </div>
        </div>
        {/* TODO: 結合対象 */}
        <Progress progress={0} /> {/*進捗が0の場合*/}
      </div>
      <MapTable />
      <div className="mt-10 flex items-center justify-center">
        <ReaderButton onClick={handleReaderClick} />
      </div>
    </ContentLayout>
  );
};
