import { useUser } from '@/lib/auth';
import { ContentLayout } from '@/components/layout/content-layout';

export const ExplanationRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  return (
    <ContentLayout>
      <div>なにか</div>
    </ContentLayout>
  );
};

/**
 * 後で消す
 * 説明用のファイル
 */
