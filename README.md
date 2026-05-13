# SKS Research Lab

异常数学实验室：一个半匿名的静态研究终端，用来整理 PDE 笔记、抽象实验、AI 工作流和项目入口。

## Stack

- Astro 6
- Markdown / MDX content collection
- remark-math + rehype-katex + KaTeX
- Static build

## Commands

```sh
npm install
npm run build
npm run preview
```

## Content

- `src/pages`：页面路由
- `src/content/blog`：研究笔记
- `src/components`：导航、页头、页脚和公式组件
- `src/styles/global.css`：全局蓝白电磁抽象风格
- `public`：公开静态资产
