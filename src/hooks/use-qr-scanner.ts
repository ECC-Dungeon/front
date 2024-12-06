import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

export const useQrScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: 'environment',
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQrCode();
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError(
              'カメラのアクセスが許可されていません。設定を確認してください。',
            );
          } else {
            setError('カメラのアクセスに失敗しました。');
            console.error('Error accessing media devices:', err);
          }
        } else {
          setError('不明なエラーが発生しました。');
          console.error('An unknown error occurred:', err);
        }
      }
    };

    // QRコードのデータをパースする
    const parseQrCode = (
      qrCodeData: string,
    ): { header: string; body: string } => {
      const delimiterIndex = qrCodeData.indexOf(';');
      if (delimiterIndex === -1) {
        return { header: qrCodeData, body: '' };
      }

      // 最初の「;」で分割
      const header = qrCodeData.slice(0, delimiterIndex); // 最初の部分
      const body = qrCodeData.slice(delimiterIndex + 1); // 残りの部分

      // type=xxxのxxx部分を取得
      const headerMatch = header.match(/^type=(.+)/);
      if (!headerMatch) {
        return { header, body };
      }

      // data=xxxのxxx部分を取得
      const bodyMatch = body.match(/^data=(.+)/);
      if (!bodyMatch) {
        return { header: headerMatch[1], body };
      }

      return { header: headerMatch[1], body: bodyMatch[1] };
    };

    const scanQrCode = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCodeData = jsQR(
            imageData.data,
            imageData.width,
            imageData.height,
          );
          // QRコードが見つかった場合
          if (qrCodeData) {
            // QRコードのデータをパースして取得
            const parsed = parseQrCode(qrCodeData.data);
            // headerが正しい確認
            if (parsed.header !== import.meta.env.VITE_APP_QR_HEADER) {
              setError('対応していないQRコードです');
              setTimeout(() => setError(''), 2000);
              setTimeout(scanQrCode, 1000);
              return;
            }
            setResult(parsed.body);
            setError('');
            return;
          } else {
            setError('QRコードが見つかりませんでした');
          }
          setTimeout(scanQrCode, 100); // 100msごとにQRコードをスキャン
        }
      }
    };

    startVideo();

    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef?.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    result,
    error,
  };
};
