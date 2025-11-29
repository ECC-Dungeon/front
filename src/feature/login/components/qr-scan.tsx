import Loading from '@/components/ui/loading/loading';
import { useQrScanner } from '@/hooks/use-qr-scanner';
import { useEffect } from 'react';

type LoginFormProps = {
  onSuccess: () => void;
};

export const QrScan = ({ onSuccess }: LoginFormProps) => {
  const { videoRef, canvasRef, result, error } = useQrScanner();

  useEffect(() => {
    if (result) {
      localStorage.setItem('token', result);
      onSuccess();
    }
  }, [result]);

  return (
    <section className="w-full items-center flex flex-col">
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
        <div className="absolute top-0 text-center text-gray-500">
          <Loading />
        </div>
      )}
    </section>
  );
};
