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
          if (qrCodeData) {
            // TODO: QRコードの内容によって処理を分岐
            // if (qrCodeData.data !== 'http://localhost:3000/result') {
            //   setError('対応していないQRコードです');
            //   setTimeout(() => setError(''), 2000);
            //   setTimeout(scanQrCode, 100);
            //   return;
            // }
            console.log(qrCodeData);
            setResult(qrCodeData.data);
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
