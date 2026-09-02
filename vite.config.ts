import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    // The v6 packages were built for webpack/CRA and still touch these globals.
    global: "globalThis",
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
  server: { port: 5273 },
}));
