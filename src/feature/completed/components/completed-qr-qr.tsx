import React, { useState } from 'react';
import CreatedQr from './created-qr';
import Button from '@/components/ui/button/button';

// QR完成画面：QRコード
export const CompletedQr: React.FC = ({}) => {
  const [isScaned] = useState<boolean>(false); //QRをスキャンしたかどうか

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <CreatedQr />
      </div>
      <div className="text-center">
        {!isScaned ? (
          <Button>
            <p>お宝獲得</p>
          </Button>
        ) : (
          <Button className="saturate-0">
            <p>お宝獲得済み</p>
          </Button>
        )}
      </div>
    </div>
  );
};
