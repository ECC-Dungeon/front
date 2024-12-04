import { ContentLayout } from '@/components/layouts/content-layout';
import Progress from '@/feature/map/components/progress.tsx';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import MapTable from '@/feature/map/components/map-table.tsx';

export const MapRoute = () => {
  return (
    <ContentLayout>
      <div>
        <div className="flex items-center justify-center space-x-12 pb-7 pt-20">
          <Stopwatch />
          <Progress progress={0} /> {/* 進捗が0の場合 */}
        </div>
        <MapTable />
      </div>
    </ContentLayout>
  );
};

/**
 * 後で消す
 * このファイルで全体マップを表示する
 * ここでしか使わないコンポーネントがあればfeature/map/components/に作成する
 */
