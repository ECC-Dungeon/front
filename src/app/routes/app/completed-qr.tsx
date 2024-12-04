import { PageLayout } from '@/components/layouts/page-layout';
import { useUser } from '@/lib/auth';

export const CompletedQrRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return (
    <PageLayout>
      <div className="text-white">QRコード読み取り完了</div>
    </PageLayout>
  );
};

/**
 * 後で消す
 * QRコード読み取り完了後の画面
 * components/だけで完結するはず...
 * 完成したqrはここで表示する
 */
