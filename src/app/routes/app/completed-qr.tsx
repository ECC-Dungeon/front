import { ContentLayout } from '@/components/layouts/content-layout';
import { useUser } from '@/lib/auth';

export const CompletedQrRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  return (
    <ContentLayout>
      <div>QRコード読み取り完了</div>
    </ContentLayout>
  );
};

/**
 * 後で消す
 * QRコード読み取り完了後の画面
 * components/だけで完結するはず...
 * 完成したqrはここで表示する
 */
