import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `bg-gradient-to-r from-[#543F2C] to-[#2A2416] h-20`,
  {
    variants: {
      size: {
        small: `w-52`,
        medium: `w-[304px]`,
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);

export const innerVariants = cva(
  `bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#63832D] to-[#485922] text-white text-2xl font-semibold border-solid border-4 border-[#526428] mx-auto h-16 flex items-center justify-center`,
  {
    variants: {
      size: {
        small: `w-48`,
        medium: `w-72`,
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick: () => void; // ボタンがクリックされたときの処理
  label: string; // ボタンに表示するテキスト
  className?: string;
}

// ボタンコンポーネント
const Button: React.FC<ButtonProps> = ({ onClick, label, size = 'small', className }) => {
  return (
    <button className={`${buttonVariants({ size })} ${className}`} onClick={onClick}>
      <div className={`${innerVariants({ size })}`}>{label}</div>
    </button>
  );
};

export default Button;
