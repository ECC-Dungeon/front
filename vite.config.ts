import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/user',
  plugins: [react(), viteTsconfigPaths()],
});
