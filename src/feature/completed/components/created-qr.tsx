import { useEffect, useRef } from 'react';
import QRCode from 'easyqrcodejs';
import picKey from '@/assets/key.svg';
import qrBackground from '@/assets/bg-qr.png';

function CreatedQr() {
  const codeRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCode | null>(null);

  useEffect(() => {
    // 既にDOMに子要素がある場合はスキップ
    if (!codeRef.current || codeRef.current.children.length > 0) return;

    qrInstanceRef.current = new QRCode(codeRef.current, {
      text: 'https://github.com/ECC-Dungeon/front/blob/feature/completed/src/feature/completed-qr/components/completed-qr-qr.tsx',
      width: 170,
      height: 170,
      quietZone: 10,
      quietZoneColor: '#ffffff',
      logo: picKey,
      logoWidth: 50,
      logoHeight: 50,
      logoBackgroundTransparent: true,
    });

    // クリーンアップ
    return () => {
      if (codeRef.current && !document.contains(codeRef.current)) {
        qrInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative flex h-64 items-center">
      <img
        src={qrBackground}
        alt="qrコード背景"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
      <div
        ref={codeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      ></div>
    </div>
  );
}

export default CreatedQr;
