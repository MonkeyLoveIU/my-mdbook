`GitBook` 和 `mdBook` 都是用于生成文档网站的工具，但它们在定位、生态和使用体验上有很大差异。以下是详细对比，帮你判断哪个更适合你使用：

---

## 🔍 简要对比

| 项目    | GitBook                 | mdBook                |
| ----- | ----------------------- | --------------------- |
| 语言    | JavaScript / TypeScript | Rust                  |
| 安装方式  | 云端服务为主，本地 CLI 安装较繁琐     | 单个二进制文件，跨平台，安装简单      |
| 输出格式  | HTML（主打网页）              | HTML、PDF（借助插件）、ePub 等 |
| 编辑方式  | 支持 Web 编辑器，也支持 Git 同步   | Markdown 文件 + 配置文件    |
| 自定义程度 | 中等（托管平台限制较多）            | 高（全本地构建，主题/模板可自定义）    |
| 插件支持  | 有，但官方 GitBook 插件生态收缩    | 有社区插件系统，且活跃           |
| 适合对象  | 非技术用户、团队文档、产品说明书        | 开发者、技术文档、Rust 社区      |
| 开源程度  | 新 GitBook 不是开源（老版本才是）   | 完全开源（由 Rust 官方社区维护）   |

---

## 🚀 各自优缺点

### 🟢 GitBook 优点

* ✅ 所见即所得编辑器（网页版），上手快。
* ✅ 内置团队协作、版本管理、评论等功能。
* ✅ 云端托管省事，适合非技术团队或写作习惯 GUI 编辑的人。

### 🔴 GitBook 缺点

* ❌ 商业化严重，新版需要注册账号，免费版功能有限。
* ❌ 本地部署和私有化支持很差（新版本不推荐本地使用）。
* ❌ 自定义功能弱，主题不好改。

---

### 🟢 mdBook 优点

* ✅ 轻量、开源、易安装，尤其适合技术人。
* ✅ 支持本地构建、离线阅读、自定义主题、代码高亮。
* ✅ 插件系统强大，比如 `mdbook-toc`、`mdbook-pdf`、`mdbook-katex`。
* ✅ 编写方式纯 Markdown，易于版本管理（Git）。

### 🔴 mdBook 缺点

* ❌ 没有 Web 编辑器，对非开发者不太友好。
* ❌ 插件功能偶尔不稳定（如 PDF 需要 wkhtmltopdf 等额外依赖）。
* ❌ 多语言支持略微复杂，需额外配置。

---

## 🧠 如何选择？

### ✅ 推荐使用 **GitBook** 如果你：

* 是非技术背景用户或内容创作者；
* 喜欢图形化界面；
* 不想折腾部署、渲染、主题等；
* 写的是产品文档、教程、团队手册等；
* 不介意云端托管；

### ✅ 推荐使用 **mdBook** 如果你：

* 是开发者或技术人员；
* 想要本地构建或私有化部署；
* 需要高度自定义、Markdown 原生编辑；
* 在写 API 文档、技术规范、开源项目文档；
* 不介意命令行操作；

---

## 🔧 补充推荐

如果你还在探索，也可以参考：

| 工具         | 特点                     |
| ---------- | ---------------------- |
| Docusaurus | React 构建，适合文档 + 博客混合站点 |
| VitePress  | Vue + Vite，轻量现代，写法简洁   |
| Docsify    | 即时预览，纯前端部署，极简文档风格      |

---


---

# 📘《mdBook 从零到大神》学习路径

---

## 🚦 第 0 阶段：准备环境

### 🎯 目标

学会安装和运行 mdBook 基础命令。

### 📚 教程内容

1. 安装 Rust（mdBook 用 Rust 构建）

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. 安装 `mdBook`：

   ```bash
   cargo install mdbook
   ```

3. 创建一本书：

   ```bash
   mdbook init my-book
   cd my-book
   mdbook serve
   ```

   访问：[http://localhost:3000](http://localhost:3000) 查看效果

---

## 🧱 第 1 阶段：基础结构和 Markdown 编写

### 🎯 目标

理解 mdBook 的目录结构、编辑方式。

### 📚 教程内容

* `book.toml`：配置文件
* `src/SUMMARY.md`：目录结构控制器
* 每个章节都用一个 `.md` 文件

### ✅ 示例：

```md
# Summary

- [简介](README.md)
- [第一章](chapter_1.md)
  - [子章节](chapter_1_1.md)
```

---

## 🎨 第 2 阶段：样式、美化与主题

### 🎯 目标

掌握样式自定义、插入图片、代码高亮等常见美化方式。

### 📚 教程内容

* 使用 Markdown 扩展：表格、脚注、数学公式（KaTeX）
* 图片插入：

  ```md
  ![描述](./images/demo.png)
  ```
* 自定义 CSS：
  新建 `theme` 文件夹 ➜ `book.toml` 里配置 `theme = ["./theme"]`

---

## ⚙️ 第 3 阶段：插件与高级功能

### 🎯 目标

学会使用插件系统，扩展功能。

### 📚 常用插件

| 插件名              | 功能说明                    |
| ---------------- | ----------------------- |
| `mdbook-toc`     | 自动生成目录                  |
| `mdbook-katex`   | 数学公式支持                  |
| `mdbook-mermaid` | 流程图、时序图支持               |
| `mdbook-pdf`     | 导出 PDF（需安装 wkhtmltopdf） |

#### 示例：启用 KaTeX 插件

1. 安装插件：

   ```bash
   cargo install mdbook-katex
   ```

2. `book.toml` 添加：

   ```toml
   [preprocessor.katex]
   ```

---

## 🛠️ 第 4 阶段：部署与自动化

### 🎯 目标

学会将 mdBook 自动部署到线上，例如 GitHub Pages。

### 📚 教程内容

#### GitHub Actions 自动部署

`.github/workflows/deploy.yml`：

```yaml
name: Deploy Book

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
        override: true
    - run: cargo install mdbook
    - run: mdbook build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./book
```

---

## 🧙 第 5 阶段：自定义构建流程 & 插件开发

### 🎯 目标

可以为团队/项目开发自己的 mdBook 插件，或构建自己的模板系统。

### 📚 教程内容

* 插件结构规范：[https://rust-lang.github.io/mdBook/for\_developers/preprocessors.html](https://rust-lang.github.io/mdBook/for_developers/preprocessors.html)
* 使用 Rust 编写插件（支持 JSON 与 stdin/stdout 通信）
* 示例插件结构：

  ```
  my-plugin/
    └─ src/main.rs
  ```

---

## 🏁 进阶资源推荐

* 官方文档：[https://rust-lang.github.io/mdBook/](https://rust-lang.github.io/mdBook/)
* GitHub 示例：[https://github.com/rust-lang/mdBook](https://github.com/rust-lang/mdBook)
* 高级插件合集：[https://github.com/azerupi/mdBook/wiki/Third-party-Plugins](https://github.com/azerupi/mdBook/wiki/Third-party-Plugins)
* 社区主题：[https://github.com/search?q=mdbook+theme](https://github.com/search?q=mdbook+theme)

---

我将逐阶段带你走完整个流程（配套示例、代码文件、部署测试），像教程一样给你逐步讲解和演示。
那么现在我们就一步步走。
