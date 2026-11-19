import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/agent/**/*.test.ts'],
    setupFiles: ['tests/agent/setup.ts'],
  },
});
