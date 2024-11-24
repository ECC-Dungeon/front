type FloorLayoutProps = {
  children: React.ReactNode;
};

export const FloorLayout = ({ children }: FloorLayoutProps) => {
  return (
    <section className="h-screen">
      <div>{children}</div>
    </section>
  );
};

/**
 * 後で消す
 * このファイルで階詳細のレイアウトを定義する
 * 必要に応じてPropsを追加する
 */
