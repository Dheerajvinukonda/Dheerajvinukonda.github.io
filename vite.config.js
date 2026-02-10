import { defineConfig } from 'vite';

export default defineConfig({
    // This is critical for GitHub Pages project sites
    // It ensures assets use the correct subpath instead of root "/"
    // Base to './' makes assets relative, helpful for both dev and raw structure compatibility
    base: './',
});
