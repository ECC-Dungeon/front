import dialogLeft from '@/assets/dialog_back.svg';
import dialogRight from '@/assets/dialog_play.svg';
import { VariantProps, cva } from 'class-variance-authority';

type DialogBubbleProps = {
  name: string;
  message: string;
  size?: 'small' | 'large';
  type?: 'normal' | 'none';
};

// サイズ
export const MessageBoxVariants = cva(
  `bg-[#323232] border-4 border-white text-white rounded-lg rounded-tl-none overflow-hidden`,
  {
    variants: {
      size: {
        small: 'h-24',
        large: 'h-[200px]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  },
);

// 左右ボタンの有無
export const StepVariants = cva(`flex gap-6`, {
  variants: {
    type: {
      normal: '',
      none: 'hidden',
    },
  },
  defaultVariants: {
    type: 'normal',
  },
});

export const DialogBubble = ({
  name,
  message,
  size = 'large',
  type = 'normal',
}: DialogBubbleProps) => {
  return (
    <div className="w-[372px]">
      <div className="flex justify-between">
        {/* 名前表示用の四角 */}
        <div className="w-[372px]">
          <div className="flex h-[32px] w-[96px] items-center justify-center rounded-t-lg bg-[#FAFAFA] px-3 py-1 text-xl font-bold text-[#323232]">
            {name}
          </div>
        </div>
        {/* 左右のボタン */}
        <div className={StepVariants({ type })}>
          <button>
            <img
              src={dialogLeft}
              alt="前のメッセージを表示"
              className="h-full w-full object-contain"
            />
          </button>
          <button>
            <img
              src={dialogRight}
              alt="後のメッセージを表示"
              className="h-full w-full object-contain"
            />
          </button>
        </div>
      </div>

      {/* メッセージ表示用の四角 */}
      <div className={MessageBoxVariants({ size })}>
        <div
          className="p-4 pl-6 text-lg"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
};
