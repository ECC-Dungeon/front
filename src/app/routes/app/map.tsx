import { ContentLayout } from '@/components/layouts/content-layout';
import { useUser } from '@/lib/auth';

export const MapRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  return (
    <ContentLayout>
      <div>aaa</div>
    </ContentLayout>
  );
};

/**
 * 後で消す
 * このファイルで全体マップを表示する
 * ここでしか使わないコンポーネントがあればfeature/map/components/に作成する
 */
