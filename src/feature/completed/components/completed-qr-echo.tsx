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
    <div className="absolute size-full">
      <img
        src={CharacterFull}
        alt="エコ"
        className="relative left-1/2 -translate-x-1/2"
      />
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <DialogBubble
          size="small"
          type="none"
          name="エコ"
          message={`よく頑張ったおめでとう!<br>１階の宝箱のところまで行こう`}
        />
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
        <Button onClick={handleClick}>
          <p>QRコードをかざす</p>
        </Button>
      </div>
    </div>
  );
};
