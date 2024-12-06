import { PageLayout } from '@/components/layouts/page-layout';
import Button from '@/components/ui/button/button.tsx';
import { CircleGradation } from '@/components/ui/gradation/circle-gradation';
import QrPiece from '@/feature/get-qr/components/qr-piece';
import QrPieces from '@/assets/qr-pieces.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const GetQrRoute = () => {

  const [clearCount, setClearCount] = useState<number>(2);
  const navigate = useNavigate();

  // clearCountに3を受け取った時、3秒経過で画面遷移
  useEffect(() => {
    if (clearCount === 3) {
      const interval = setInterval(() => {
        navigate('/app/completed-qr');
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <PageLayout>
      <div className="text-center">
        <CircleGradation>
          {clearCount === 3 ? (
            <div className="pt-28">
              <div className="font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>全てゲットした!</p>
              </div>
              <div className="mx-auto mt-16 w-72">
                <img src={QrPieces} alt="qr欠片画像" className="w-full" />
              </div>
            </div>
          ) : (
            <div className="pt-28">
              <div className="font-sans text-4xl font-semibold text-white">
                <p>QRコードのかけらを</p>
                <p>ゲットした!</p>
              </div>
              <QrPiece pieceId={clearCount} className="my-12" />
              <div className="font-sans text-xl font-semibold leading-loose text-white">
                <p>鍵が完成するまで</p>
                <p>あと{3 - clearCount}個かけらをゲットしないと</p>
                <p>いけないみたい...</p>
                <Button className="mt-14">
                  <p>冒険を続ける</p>
                </Button>
              </div>
            </div>
          )}
        </CircleGradation>
      </div>
    </PageLayout>
  );
};

/**
 * 後で消す
 * このファイルでqrコードのかけらを取得した時の画面を表示する
 * 完成した瞬間(3つ揃った時)はここで3つ揃った時の画面を表示したのちにcompleted-qrに遷移する
 */