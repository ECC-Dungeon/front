import { ContentLayout } from '@/components/layouts/content-layout';
import { FloorLayout } from '@/components/layouts/floor-layout';
import { useUser } from '@/lib/auth';

export const FloorRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return (
    <ContentLayout>
      <FloorLayout>
        <div>aaa</div>
      </FloorLayout>
    </ContentLayout>
  );
};

/**
 * 後で消す
 * このファイルで階詳細を表示する
 * component/layouts/floor-layout.tsxを使用する
 */
