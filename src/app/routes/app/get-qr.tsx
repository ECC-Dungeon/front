import { useUser } from '@/lib/auth';
import { PageLayout } from '@/components/layouts/page-layout';
import Button from '@/components/ui/button/button.tsx';
import CircleGradation from '@/components/ui/gradation/circle-gradation';
import QrPiece from '@/feature/get-qr/components/qr-piece';

export const GetQrRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return (
    <PageLayout>
      <div className="relative flex h-full justify-center pt-28 text-center">
        <CircleGradation>
          <div className="font-sans text-4xl font-semibold text-white">
            <p>QRコードのかけらを</p>
            <p>ゲットした!</p>
          </div>
          <QrPiece pieceId={3} className="my-12" />
          <div className="font-sans text-xl font-semibold leading-loose text-white">
            <p>鍵が完成するまで</p>
            <p>あと2個かけらをゲットしないと</p>
            <p>いけないみたい...</p>
          </div>
          <Button
            label="冒険を続ける"
            onClick={() => {}}
            size="small"
            className="mt-14"
          />
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
