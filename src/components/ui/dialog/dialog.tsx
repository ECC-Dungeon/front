import dialogLeft from '@/assets/dialog_back.png';
import dialogRight from '@/assets/dialog_play.png';

type DialogBubbleProps = { 
  name: string;
  message: string;
};

export const DialogBubble = ({ name, message }: DialogBubbleProps) => {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[372px]">
      {/* 名前表示用の四角 */}
      <div>
        <div className="absolute top-0 left-0 bg-[#FAFAFA] text-[#323232] rounded-t-lg px-3 py-1 text-xl font-bold w-[96px] h-[32px] flex items-center justify-center">
          {name}
        </div>
      </div>
      {/* 左右のボタン */}
      <div className="absolute top-0 right-4 flex gap-6">
        <button>
          <img
            src={dialogLeft}
            alt="前のメッセージを表示"
            className="w-full h-full object-cover"
          />
        </button>
        <button>
          <img
            src={dialogRight}
            alt="後のメッセージを表示"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* メッセージ表示用の四角 */}
      <div className="bg-[#323232] border-4 border-white text-white rounded-lg rounded-tl-none overflow-hidden mt-7 w-[372px] h-[200px]">
        <div className="p-4 pl-6 text-lg" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};
