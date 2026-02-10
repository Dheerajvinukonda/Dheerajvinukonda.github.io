import { defineConfig } from 'vite';

export default defineConfig({
    // This is critical for GitHub Pages project sites
    // It ensures assets use the correct subpath instead of root "/"
    base: '/Dheerajvinukonda.github.io/',
    build: {
        outDir: 'docs',
    }
});
