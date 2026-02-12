// 進捗に応じたSVGパスを生成する
export const generateProgressPath = (progressAngle: number): string => {
  if (progressAngle === 0) {
    // 進捗0の場合、上部に小さな台形を表示（元のSVGデザインを再現）
    return 'M54.9998 10.3095V0H44.9998V10.3095C46.6378 10.1052 48.3065 10 49.9998 10C51.6931 10 53.3618 10.1052 54.9998 10.3095Z';
  }

  if (progressAngle >= 360) {
    // 完全な円（外周リング）
    return 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0 Z M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10 Z';
  }

  // 部分的な円弧（リング状）
  const innerRadius = 40;
  const outerRadius = 50;
  const startAngle = -90; // 上部から開始

  const endAngle = startAngle + progressAngle;

  const outerStartX = 50 + outerRadius * Math.cos((startAngle * Math.PI) / 180);
  const outerStartY = 50 + outerRadius * Math.sin((startAngle * Math.PI) / 180);
  const outerEndX = 50 + outerRadius * Math.cos((endAngle * Math.PI) / 180);
  const outerEndY = 50 + outerRadius * Math.sin((endAngle * Math.PI) / 180);

  const innerStartX = 50 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
  const innerStartY = 50 + innerRadius * Math.sin((startAngle * Math.PI) / 180);
  const innerEndX = 50 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
  const innerEndY = 50 + innerRadius * Math.sin((endAngle * Math.PI) / 180);

  const largeArcFlag = progressAngle > 180 ? 1 : 0;

  return `
    M ${outerStartX} ${outerStartY}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
    L ${innerEndX} ${innerEndY}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
    Z
  `;
};
