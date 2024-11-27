import React, { useEffect, useState } from 'react';
import { useStopwatch } from "react-timer-hook";

// Timer コンポーネント
const Timer: React.FC = () => {
  return (
    <div className='text-center text-white'>
      <p>経過時間</p>
      <MyStopwatch />
    </div>
  );
};

export default Timer;

function MyStopwatch() {

  // ローカルストレージから分と秒を取得
  const savedMinutes = localStorage.getItem("minutes");
  const savedSeconds = localStorage.getItem("seconds");

  // ローカルストレージの値がnullの場合は0からスタート
  const initialTimeInSeconds = savedMinutes && savedSeconds
  ? parseInt(savedMinutes) * 60 + parseInt(savedSeconds)
  : 0;
  
  // 開始時間の設定
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + initialTimeInSeconds); //  ここを変更する？

  // タイマーの設定
  const { seconds, minutes } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset
  });

  // タイマーの状態管理
  const [storedMinutes, setStoredMinutes] = useState<string>('00');
  const [storedSeconds, setStoredSeconds] = useState<string>('00');

  // 2桁表示にするためのゼロ埋め
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  useEffect(() => {
    // ローカルストレージに保存
    localStorage.setItem("minutes", formattedMinutes);
    localStorage.setItem("seconds", formattedSeconds);
  
    // storedMinutes と storedSeconds を更新
    setStoredMinutes(formattedMinutes);
    setStoredSeconds(formattedSeconds);
  }, [formattedMinutes, formattedSeconds]);
  
  return (
    <div style={{ textAlign: "center" }}>
      <div className='text-5xl'>
        <span>{storedMinutes}</span>:
        <span>{storedSeconds}</span>
      </div>
    </div>
  );
}
