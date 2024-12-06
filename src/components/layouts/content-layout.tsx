import * as React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <section className="h-screen overflow-hidden bg-[url('assets/bg-brick-black.png')] bg-cover bg-center">
      <div className="">{children}</div>
    </section>
  );
};

/**
 * 後で消す
 * このファイルで共通のレイアウトを定義する
 * 背景とか
 */
