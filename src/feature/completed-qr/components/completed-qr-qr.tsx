import React, { useState } from 'react';
import CreatedQr from './created-qr';
import Button from '@/components/ui/button/button';

// QR完成画面：QRコード
export const CompletedQr: React.FC = ({}) => {
  const [isScaned, setIsScaned] = useState<boolean>(false); //QRをスキャンしたかどうか

  return (
    <div className="">
      <div className="mt-60">
        <CreatedQr />
      </div>
      <div className="mt-28 text-center">
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
