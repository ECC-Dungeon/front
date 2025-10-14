import Loading from '@/components/ui/loading/loading';
import { paths } from '@/config/paths';
import { useQrScanner } from '@/hooks/use-qr-scanner';
import { useNextFloor } from '@/lib/next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const QrScan = () => {
  const navigate = useNavigate();
  const { videoRef, canvasRef, result, error } = useQrScanner();
  const [isProcessing, setIsProcessing] = useState(false); // 処理中かどうかのフラグ

  const nextFloor = useNextFloor({
    mutationConfig: {
      onSuccess: (response) => {
        if (response?.msg) {
          const nextNum = response.msg.NextNum;
          console.log(`NextNum: ${nextNum}`);
        } else {
          console.error('Response structure is incorrect or undefined');
        }
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    },
  });

  const handleClick = async (scanResult: string) => {
    try {
      setIsProcessing(true); // 処理を開始
      const response = await nextFloor.mutateAsync({
        data: { clear_floor: parseInt(scanResult) },
      });

      console.log('response:', response.msg);

      navigate(paths.app.getQr.getHref(), {
        replace: true,
        state: response,
      });
    } catch (err) {
      console.error('Error processing QR code:', err);
    } finally {
      setIsProcessing(false); // 処理を終了
    }
  };

  useEffect(() => {
    if (result && !isProcessing) {
      handleClick(result);
    }
  }, [result, isProcessing]);

  return (
    <section className="flex w-full flex-col items-center">
      {!result && (
        <div className="size-72">
          <div className="relative h-72 w-72">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute top-0 left-0 -z-50 h-72 w-72"
            />
            <canvas
              ref={canvasRef}
              width="288"
              height="288"
              className="absolute top-0 left-0"
            />
          </div>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      {!result && !error && (
        <div className="absolute top-0 text-center text-gray-500">
          <Loading />
        </div>
      )}
    </section>
  );
};
