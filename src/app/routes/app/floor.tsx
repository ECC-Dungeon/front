import { useLocation, useNavigate } from 'react-router-dom';
import { DialogBubble } from '@/components/ui/dialog/dialog';
import character from '@/assets/echo.png';
import { IoIosArrowBack } from "react-icons/io";
import Stopwatch from '@/feature/map/components/stopwatch.tsx';

// 背景画像のインポート
import brown from '@/assets/floor1-bg.png';
import green from '@/assets/floor2-bg.png';
import red from '@/assets/floor5-bg.png';
import purple from '@/assets/floor6-bg.png';
// マップ画像のインポート
import first from '@/assets/floor1-map.png';
import second from '@/assets/floor2-map.png';
import fifth_sixth from '@/assets/floor5_6-map.png';

export const FloorRoute = () => {

  return <Floor />;
};

const floors: Record<
  number,
  { id: number; name: string; background: string; floorMap: string }
> = {
  1: { id: 1, name: '１階', background: brown, floorMap: first },
  2: { id: 2, name: '２階', background: green, floorMap: second },
  5: { id: 5, name: '５階', background: red, floorMap: fifth_sixth },
  6: { id: 6, name: '６階', background: purple, floorMap: fifth_sixth },
};

const Floor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const floorData = floors[location.state.id];

  console.log('floorData:', floorData);

  if (!floorData) {
    navigate('/app/map'); // map.tsxにリダイレクト
    return null;
  }

  const FloorMap = () => {
    return (
      <div className="relative mx-auto aspect-[4/3] w-[80%] rounded-lg p-4">
        <img
          src={floorData.floorMap}
          alt={`${floorData.name}のマップ`}
          className="h-full w-full object-contain"
        />
        <div className="absolute bottom-[-0.5rem] left-1/2 flex h-[255px] w-[318px] -translate-x-1/2 transform items-center justify-center rounded-xl bg-[#FAFAFA]/20 shadow-lg"></div>
      </div>
    );
  };

  return (
    <section
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${floorData.background})` }}
    >
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 pt-8 text-2xl text-white">
        <button
          className="flex items-center gap-3 rounded-full px-5 py-3"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />

          <span className="text-lg font-semibold">戻る</span>
        </button>
        <div className="flex flex-1 justify-center">
          <div className="text-3xl font-bold">{floorData.name}</div>
        </div>
        <div className="rounded-full px-5 py-3 text-2xl font-semibold">
          <Stopwatch />
        </div>
      </header>

      {/* マップ */}
      <FloorMap />

      {/* キャラクターとダイアログ */}
      <div className="absolute bottom-0 left-0 w-full">
        <img src={character} alt="エコ" className="h-auto w-[370px]" />
        <div className="fixed bottom-20 left-1/2 w-[372px] -translate-x-1/2 transform">
          <DialogBubble
            name="エコ"
            message={`はじめまして！<br>ECCダンジョンの案内係を担当するエコだよ！<br>今日はよろしくね。`}
          />
        </div>
      </div>
    </section>
  );
};
