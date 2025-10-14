import { useState, useEffect } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[#323232]">
      <div className="ml-14 flex items-center text-4xl font-bold text-[#FFFFFF]">
        <div>Loading</div>
        <div className="w-16 text-left">{dots}</div>
      </div>
    </div>
  );
};

export default Loading;
