import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import Pages from "vite-plugin-pages";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), Pages(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist", // or set to "/app/dist"
    },
    base: "/",
    server:
      env.VITE_MODE === "production" || env.VITE_MODE === "local"
        ? {
            proxy: {
              "/api": env.VITE_BACKEND_URL,
            },
            port: 5173,
          }
        : undefined,
  };
});
