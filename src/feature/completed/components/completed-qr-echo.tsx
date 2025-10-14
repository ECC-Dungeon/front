import React from 'react';
import CharacterFull from '@/assets/character-full.png';
import { DialogBubble } from '@/components/ui/dialog/dialog';
import Button from '@/components/ui/button/button';

interface CompletedEchoProps {
  scan: boolean;
  setScan: React.Dispatch<React.SetStateAction<boolean>>;
}

// QR完成画面：エコちゃん
export const CompletedEcho: React.FC<CompletedEchoProps> = ({
  setScan,
  scan,
}) => {
  const handleClick = () => {
    setScan(!scan);
  };

  return (
    <div className="relative h-screen">
      <img
        src={CharacterFull}
        alt="エコ"
        className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2 transform"
      />
      <div className="absolute bottom-64 left-1/2 -translate-x-1/2 transform">
        <DialogBubble
          size="small"
          type="none"
          name="エコ"
          message={`よく頑張ったおめでとう!<br>１階の宝箱のところまで行こう`}
        />
      </div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 transform">
        <Button onClick={handleClick}>
          <p>QRコードをかざす</p>
        </Button>
      </div>
    </div>
  );
};
