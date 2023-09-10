import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    viteMockServe({
      mockPath: "./mock", //设置模拟数据的存储文件夹
      //@ts-ignore
      supportTs: true, //是否读取ts文件模块
      logger: true, //是否在控制台显示请求日志
      localEnabled: true, //设置是否启用本地mock文件
      prodEnabled: true, //设置打包是否启用mock功能
    }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 执行icon name的格式
      symbolId: 'icon-[name]'
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    port: 8000,
  },
});
