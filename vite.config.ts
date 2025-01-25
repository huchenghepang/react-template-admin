import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': "./src",
    },
  },
  server:{
    open:false,
    port:5142,
    host:"localhost",
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin: true, 
      }
    }
  }
});
