import React from 'react';
import QrPiece1 from '@/assets/qr-piece1.svg';
import QrPiece2 from '@/assets/qr-piece2.svg';
import QrPiece3 from '@/assets/qr-piece3.svg';

const QrSrc: Record<number, string> = {
  1: QrPiece1,
  2: QrPiece2,
  3: QrPiece3,
};

// 許可されたフロアの定義
const PIECE_SRC = [1, 2, 3] as const;
type pieceSrc = (typeof PIECE_SRC)[number];

interface QrPieceProps {
  pieceId: pieceSrc;
  className?: string;
}

// qrの欠片コンポーネント
const QrPiece: React.FC<QrPieceProps> = ({ pieceId, className }) => {
  return (
    <div className={`flex justify-center ${className} mx-auto h-48 w-48`}>
      <img
        src={QrSrc[pieceId]}
        alt="qr欠片画像"
        className="object-fit rotate-12"
      />
    </div>
  );
};

export default QrPiece;
