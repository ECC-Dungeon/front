import { useUser } from '@/lib/auth';

export const GetQrRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  return <div>qrコードのかけらゲット画面</div>;
};

/**
 * 後で消す
 * このファイルでqrコードのかけらを取得した時の画面を表示する
 * 完成した瞬間(3つ揃った時)はここで3つ揃った時の画面を表示したのちにcompleted-qrに遷移する
 */
