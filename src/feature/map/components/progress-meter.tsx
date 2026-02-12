import React from 'react';
import { generateProgressPath } from './progress-path';

interface ProgressMeterProps {
  current: number;
  total: 1 | 2 | 3 | 4 | 5 | 6;
}

// サイズを取得
const getSize = (): number => {
  return 80;
};

// 鍵の色
const getIconColor = (): { start: string; end: string } => {
  return { start: '#E9D169', end: '#9C6C4C' };
};

// グラデーション座標を取得
const getGradientCoords = () => {
  return { x1: '43.4472', y1: '17.4599', x2: '35.6837', y2: '57.7273' };
};

// 進捗メーターのビジュアル表示コンポーネント
export const ProgressMeter: React.FC<ProgressMeterProps> = ({
  current,
  total,
}) => {
  const progressAngle = (current / total) * 360;
  const progressPath = generateProgressPath(progressAngle);
  const size = getSize();
  const iconColor = getIconColor();
  const gradientCoords = getGradientCoords();

  return (
    <svg viewBox="0 0 100 100" className="h-auto" width={size} height={size}>
      <defs>
        <linearGradient
          id="progressGradient"
          x1="53.35%"
          y1="0%"
          x2="53.35%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#E9D169" />
          <stop offset="100%" stopColor="#9C6C4C" />
        </linearGradient>
        <linearGradient
          id="iconGradient"
          x1={gradientCoords.x1}
          y1={gradientCoords.y1}
          x2={gradientCoords.x2}
          y2={gradientCoords.y2}
        >
          <stop offset="0%" stopColor={iconColor.start} />
          <stop offset="100%" stopColor={iconColor.end} />
        </linearGradient>
        <mask
          id="keyMask"
          maskUnits="userSpaceOnUse"
          x="23"
          y="19"
          width="55"
          height="55"
        >
          <rect
            x="43"
            y="19"
            width="40"
            height="40"
            transform="rotate(30 43 19)"
            fill="#D9D9D9"
          />
        </mask>
      </defs>

      {/* 背景円 */}
      <circle cx="50" cy="50" r="50" fill="#EDEDED" />
      <circle cx="50" cy="50" r="40" fill="#FAFAFA" />

      {/* 進捗表示 */}
      <path
        d={progressPath}
        fill="url(#progressGradient)"
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/* 鍵アイコン */}
      <g mask="url(#keyMask)">
        <path
          d="M51.8903 43.6665C53.1545 44.3964 54.483 44.5736 55.876 44.1981C57.2691 43.8223 58.3306 43.0024 59.0605 41.7382C59.7903 40.4741 59.9673 39.1456 59.5915 37.7527C59.216 36.3597 58.3962 35.2983 57.132 34.5684C55.8678 33.8386 54.5393 33.6614 53.1463 34.0369C51.7534 34.4127 50.6921 35.2328 49.9622 36.4969C49.2323 37.7611 49.0552 39.0895 49.4308 40.4822C49.8066 41.8754 50.6264 42.9368 51.8903 43.6665ZM41.5105 61.7781C41.3491 61.6849 41.2153 61.5729 41.109 61.4419C41.0026 61.3112 40.92 61.1487 40.8613 60.9544L39.19 55.21C39.1312 55.0156 39.1099 54.835 39.1262 54.6679C39.1424 54.5009 39.1928 54.335 39.2774 54.1702C39.3619 54.005 39.4707 53.8674 39.6038 53.7573C39.7372 53.6469 39.901 53.5624 40.0953 53.5036L43.6333 52.4031L42.7287 49.0258C42.6742 48.8234 42.661 48.6379 42.6891 48.4693C42.7167 48.3009 42.7762 48.1375 42.8676 47.9792C42.959 47.8209 43.0701 47.6888 43.2009 47.5828C43.3316 47.4764 43.4982 47.3961 43.7007 47.3421L46.5844 46.5691L47.1261 45.6309C45.6376 44.0979 44.7763 42.2749 44.5424 40.1618C44.3083 38.0489 44.7445 36.0341 45.8511 34.1176C47.24 31.712 49.2625 30.1533 51.9186 29.4416C54.5748 28.7299 57.1057 29.0684 59.5113 30.4573C61.917 31.8462 63.4756 33.8687 64.1873 36.5249C64.8991 39.1811 64.5605 41.712 63.1716 44.1176C62.0095 46.1304 60.4648 47.5186 58.5376 48.2823C56.6105 49.0461 54.635 49.2179 52.6109 48.7976L45.7915 60.6091C45.7029 60.7625 45.589 60.895 45.4499 61.0065C45.3108 61.118 45.14 61.2008 44.9375 61.2549L42.5362 61.8983C42.3412 61.9506 42.1618 61.967 41.9982 61.9476C41.8345 61.9278 41.672 61.8713 41.5105 61.7781Z"
          fill="url(#iconGradient)"
        />
      </g>

      {/* 進捗テキスト */}
      <text
        x="50"
        y="75"
        textAnchor="middle"
        fontSize="10"
        fontWeight="400"
        fill="#323232"
        fontFamily="sans-serif"
      >
        {current}/{total}
      </text>
    </svg>
  );
};
