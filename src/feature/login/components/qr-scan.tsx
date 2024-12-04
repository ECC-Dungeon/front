import { useQrScanner } from '@/hooks/use-qr-scanner';
import { useEffect } from 'react';

type LoginFormProps = {
  onSuccess: () => void;
};

export const QrScan = ({ onSuccess }: LoginFormProps) => {
  const { videoRef, canvasRef, result, error } = useQrScanner();

  useEffect(() => {
    if (result) {
      localStorage.setItem('gameToken', result);
      onSuccess();
    }
  }, [result]);

  return (
    <section>
      {!result && (
        <div className="size-72">
          <div className="relative h-72 w-72">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute left-0 top-0 -z-50 h-72 w-72"
            />
            <canvas
              ref={canvasRef}
              width="288"
              height="288"
              className="absolute left-0 top-0"
            />
          </div>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      {!result && !error && (
        // TODO: ローディングコンポーネントに切り替える
        <p className="text-center text-gray-500">読み取り中...</p>
      )}
    </section>
  );
};
