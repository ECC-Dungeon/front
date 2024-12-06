import React from 'react';

type CircleGradationProps = {
  children?: React.ReactNode;
};

// 円形グラデーションコンポーネント
export const CircleGradation: React.FC<CircleGradationProps> = ({ children }) => {
  return (
    <div className="absolute h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fdd1591e] to-[#32323241]">
      {children}
    </div>
  );
};
