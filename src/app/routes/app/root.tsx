import { Outlet } from 'react-router-dom';

export const AppRoot = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const AppRootErrorBoundary = () => {
  return (
    <div>
      <h1>AppRootErrorBoundary</h1>
    </div>
  );
};
