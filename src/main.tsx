import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app/App';
import { enableMocking } from './mocks';

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

enableMocking().then(() => {
  createRoot(root).render(
    // <StrictMode>
    <App />,
    // </StrictMode>,
  );
});
