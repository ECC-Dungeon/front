import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DialogBubble } from '@/components/ui/dialog/dialog';
import character from '@/assets/echo.png';
import { IoIosArrowBack } from 'react-icons/io';
import Stopwatch from '@/feature/map/components/stopwatch.tsx';
import { paths } from '@/config/paths';

// 背景画像のインポート
import floorOne from '@/assets/background/floor1-bg.png';
import floorTwo from '@/assets/background/floor2-bg.png';
import floorThree from '@/assets/background/floor3-bg.png';
import floorFour from '@/assets/background/floor4-bg.png';
import floorFive from '@/assets/background/floor5-bg.png';
import floorSix from '@/assets/background/floor6-bg.png';
// マップ画像のインポート
import first from '@/assets/map/floor1-map.png';
import second from '@/assets/map/floor2-map.png';
import fifth_sixth from '@/assets/map/floor5_6-map.png';

export const FloorRoute = () => {
  return <Floor />;
};

const floors: Record<
  number,
  { id: number; name: string; background: string; floorMap: string }
> = {
  1: { id: 1, name: '１階', background: floorOne, floorMap: first },
  2: { id: 2, name: '２階', background: floorTwo, floorMap: second },
  3: { id: 3, name: '３階', background: floorThree, floorMap: fifth_sixth },
  4: { id: 4, name: '４階', background: floorFour, floorMap: fifth_sixth },
  5: { id: 5, name: '５階', background: floorFive, floorMap: fifth_sixth },
  6: { id: 6, name: '６階', background: floorSix, floorMap: fifth_sixth },
};

const Floor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const floorData = floors[location.state?.id];

  console.log('floorData:', floorData);

  useEffect(() => {
    if (!floorData) {
      navigate(paths.app.map.getHref(), { replace: true });
    }
  }, [floorData, navigate]);

  if (!floorData) {
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
      <header className="z-10 flex items-center justify-between px-6 pt-8 text-2xl text-white relative">
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
      <div className="absolute bottom-0 left-0 z-0 size-full">
        <div className="flex h-full flex-col justify-end">
          <img
            src={character}
            alt="エコ"
            className="mx-auto h-auto w-[370px]"
          />
          <DialogBubble
            name="エコ"
            message={`はじめまして！<br>ECCダンジョンの案内係を担当するエコだよ！<br>今日はよろしくね。`}
          />
        </div>
      </div>
    </section>
  );
};
