import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    /*
    alias: {
      "@appRoot": "/",
      "@src": "/src",
      "@components'": "/src/components",
      "@InputExt": "/src/components/common/InputExt",
    },
    */    

    ///*
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@InputExt', replacement: '/src/components/common/InputExt' }, 
      { find: '@GenderRadio', replacement: '/src/components/common/GenderRadio' }, 
      { find: '@validation', replacement: '/src/shared/lib/validation.ts' }, 
    ],
    //*/
  },  
})
