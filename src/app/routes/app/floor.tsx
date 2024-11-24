import { ContentLayout } from '@/components/layouts/content-layout';
import { FloorLayout } from '@/components/layouts/floor-layout';

export const FloorRoute = () => {
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
