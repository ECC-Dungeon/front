import { ContentLayout } from '@/components/layouts/content-layout.tsx';
import { PageLayout } from '@/components/layouts/page-layout';
import { CircleGradation } from '@/components/ui/gradation/circle-gradation';
import { CompletedEcho } from '@/feature/completed/components/completed-qr-echo';
import { CompletedQr } from '@/feature/completed/components/completed-qr-qr';
import { useState } from 'react';

export const CompletedQrRoute = () => {
  const [scan, setScan] = useState<boolean>(false);

  if (!scan) {
    return (
      <ContentLayout>
        <div className="relative flex h-screen items-center justify-center">
          <CircleGradation>
            <CompletedEcho setScan={setScan} scan={scan} />
          </CircleGradation>
        </div>
      </ContentLayout>
    );
  }
  return (
    <PageLayout>
      <div className="relative flex h-screen justify-center">
        <CircleGradation>
          <CompletedQr />
        </CircleGradation>
      </div>
    </PageLayout>
  );
};
