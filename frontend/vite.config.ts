import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api": {
        // keeping this just in case they fix backend or use it for swagger
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
