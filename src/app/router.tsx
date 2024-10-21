import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';

const routes = [
  {
    path: '/',
    Component: () => <div>Home</div>,
  }
] as const satisfies RouteProps[];

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
