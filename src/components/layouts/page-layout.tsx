import * as React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <section className="h-screen overflow-hidden bg-[#323232] bg-cover bg-center">
      <div className="">{children}</div>
    </section>
  );
};
