import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(``, {
  variants: {
    size: {
      mini: `w-32`,
      small: `w-52`,
      medium: `w-[304px]`,
      large: `w-44`,
    },
    visual: {
      normal: ``,
      outline: `h-20 bg-gradient-to-r from-[#543F2C] to-[#2A2416]`,
    },
  },
  defaultVariants: {
    size: 'small',
    visual: 'outline',
  },
});

export const innerVariants = cva(
  `bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#63832D] to-[#485922] text-white font-semibold border-solid border-4 border-[#526428] mx-auto h-16 flex items-center justify-center`,
  {
    variants: {
      size: {
        mini: `w-28 text-xl`,
        small: `w-48 text-2xl`,
        medium: `w-72 text-2xl`,
        large: `w-40 text-3xl`,
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: 'mini' | 'small' | 'medium' | 'large';
  visual?: 'normal' | 'outline';
};

// ボタンコンポーネント
const Button: React.FC<ButtonProps> = ({
  children,
  size = 'small',
  visual = 'outline',
  className,
  ...props
}) => {
  return (
    <button
      className={`${buttonVariants({ size, visual })} ${className} `}
      {...props}
    >
      <div className={`${innerVariants({ size })}`}>{children}</div>
    </button>
  );
};

export default Button;