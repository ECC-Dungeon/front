import { useLocation, useNavigate } from 'react-router-dom';
import { DialogBubble } from '@/components/ui/dialog/dialog';
import { useUser } from '@/lib/auth';
// import { ContentLayout } from '@/components/layouts/content-layout';
import character from '@/assets/echo.png';
import { IoIosArrowBack } from "react-icons/io";

type FloorData = {
  id: number;
  name: string;
  background: string;
  floorMap: string;
};

export const FloorRoute = () => {
  if (process.env.NODE_ENV !== 'development') {
    const user = useUser();
    if (!user.data) return null;
  }

  return <Floor />;
};

const Floor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const floorData = location.state?.floor as FloorData;

  if (!floorData) {
    navigate("/app/map"); // map.tsxにリダイレクト
    return null;
  }

  const FloorMap = () => {
    return (
      <div className="relative mx-auto w-[80%] aspect-[4/3] rounded-lg p-4">
        <img 
          src={floorData.floorMap} 
          alt={`${floorData.name}のマップ`}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[318px] h-[255px] bg-[#FAFAFA]/20 rounded-xl shadow-lg flex items-center justify-center"></div>
      </div>
    );
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${floorData.background})` }}
    >
      {/* ヘッダー */}
      <header className="flex justify-between items-center px-6 pt-8 text-white text-2xl">
        <button 
          className="flex items-center gap-3 px-5 py-3 rounded-full"
          onClick={() => navigate(-1)}
        >
         <IoIosArrowBack />

          <span className="text-lg font-semibold">戻る</span>
        </button>
        <div className="flex-1 flex justify-center">
          <div className="font-bold text-3xl">{floorData.name}</div>
        </div>
        {/* 後でタイマーに修正 */}
        <div className="font-semibold px-5 py-3 rounded-full text-2xl">00:06</div>
      </header>

      {/* マップ */}
      <FloorMap />

      {/* キャラクターとダイアログ */}
      <div className="absolute bottom-0 left-0 w-full">
        <img 
          src={character} 
          alt="エコ" 
          className="w-[370px] h-auto"
        />
        <DialogBubble 
          name="エコ"
          message={`はじめまして！<br>ECCダンジョンの案内係を担当するエコだよ！<br>今日はよろしくね。`}
        />
      </div>
    </section>
  );
};
