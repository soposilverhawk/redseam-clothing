import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/redseam-clothing",
  plugins: [react()],
  server: {
    open: true,
  },
});
