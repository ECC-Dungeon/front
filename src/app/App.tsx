import { Provider } from './provider';
import { Router } from './router';

export const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};
