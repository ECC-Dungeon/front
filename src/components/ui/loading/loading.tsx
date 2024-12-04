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
    <div className="flex items-center justify-center h-[866px] w-[412px] bg-[#323232]">
      <div className="flex items-center text-[#FFFFFF] text-4xl font-bold ml-14">
        <div>Loading</div>
        <div className="w-16 text-left">{dots}</div>
      </div>
    </div>
  );
};

export default Loading;