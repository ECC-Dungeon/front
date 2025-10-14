import React from 'react';
import QrPiece1 from '@/assets/qr-piece1.svg?url';
import QrPiece2 from '@/assets/qr-piece2.svg?url';
import QrPiece3 from '@/assets/qr-piece3.svg?url';

const QrSrc: Record<number, string> = {
  1: QrPiece1,
  2: QrPiece2,
  3: QrPiece3,
};

interface QrPieceProps {
  pieceId: number;
  className?: string;
}

// qrの欠片コンポーネント
const QrPiece: React.FC<QrPieceProps> = ({ pieceId, className }) => {
  const imageSrc = QrSrc[pieceId];

  if (!imageSrc) {
    console.error(`QR piece ${pieceId} not found`);
    return null;
  }

  return (
    <div className={`flex justify-center ${className} mx-auto h-48 w-48`}>
      <img
        src={imageSrc}
        alt={`QR欠片${pieceId}`}
        className="rotate-12 object-contain"
        onError={(e) => {
          console.error(`Failed to load image: ${imageSrc}`);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

export default QrPiece;
