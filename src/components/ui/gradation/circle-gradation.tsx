import React from 'react';

// 円形グラデーションコンポーネント
const CircleGradation: React.FC = () => {
  return (
    <div className="absolute h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fdd15926] via-[#fdd1590f] to-[#fdd15906] blur-md filter"></div>
  );
};

export default CircleGradation;
