import React, { useEffect } from 'react';
import QRCode from 'easyqrcodejs';
import picKey from '@/assets/key.svg';
import qrBackground from '@/assets/bg-qr.png';

function CreatedQr() {
  const code = React.createRef<HTMLDivElement>();

  useEffect(() => {
    new QRCode(code.current, {
      text: 'https://github.com/ushelp/EasyQRCodeJS',
      width: 170,
      height: 170,
      quietZone: 10,
      quietZoneColor: '#ffffff',
      logo: picKey,
      logoWidth: 50,
      logoHeight: 50,
      logoBackgroundTransparent: true,
    });
  }, [code]);

  return (
    <div className="relative flex h-64 items-center">
      <img
        src={qrBackground}
        alt="qrコード背景"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
      <div
        ref={code}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      ></div>
    </div>
  );
}

export default CreatedQr;
