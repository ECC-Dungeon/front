import React from 'react';

type CircleGradationProps = {
  children?: React.ReactNode;
};

// 円形グラデーションコンポーネント
const CircleGradation: React.FC<CircleGradationProps> = ({ children }) => {
  return (
    <div className="absolute h-[520px] w-[520px] flex-col items-center justify-center rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fdd15926] via-[#fdd1590f] to-[#fdd15906] filter backdrop-blur-lg">
      {children}
    </div>
  );
};

export default CircleGradation;
