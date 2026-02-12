import React, { ButtonHTMLAttributes } from 'react';
import { MdOutlineQrCodeScanner } from 'react-icons/md';

// qrを読み取るボタンコンポーネント
const ReaderButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="flex h-16 w-52 items-center justify-center rounded-2xl bg-gradient-to-b from-[#E9D169] to-[#9C6C4C]"
    >
      <div className="mx-2 flex h-14 w-full items-center justify-center rounded-xl">
        <MdOutlineQrCodeScanner className="text-5xl" />
        <p className="text-xs font-bold">QRコードを読み取る</p>
      </div>
    </button>
  );
};

export default ReaderButton;
