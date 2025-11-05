import React from 'react';

type CircleGradationProps = {
  children?: React.ReactNode;
};

// 円形グラデーションコンポーネント
export const CircleGradation: React.FC<CircleGradationProps> = ({
  children,
}) => {
  return (
    <div className="relative size-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fdd15926] via-[#fdd1590f] to-[#fdd15906] filter backdrop-blur-lg">
        {children}
      </div>
    </div>
  );
};
