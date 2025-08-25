<!-- timestamp inserted -->
> 📄 创建时间：2025-07-29 15:37:59  
> 🛠️ 修改时间：2025-07-29 15:37:59

非常好！你已经写好了 mdBook 内容，现在只需 **三步** 就能完成：

> ✅ 本地同步到 GitHub
> ✅ 后续更新也能同步
> ✅ 通过 GitHub Pages 自动部署网站

最清晰、零废话的**实操指南**👇

---

## ✅ 一、准备 GitHub 仓库

1. 登录 [https://github.com](https://github.com)
2. 新建一个仓库（repo），名字可以叫：`my-mdbook`
3. 不勾选 `README`、`gitignore`，保持干净空仓库

记下仓库地址，例如：

```bash
https://github.com/你的用户名/my-mdbook.git
```

---

## ✅ 二、将本地 mdBook 推送到 GitHub (需要先下载Git - 参考第五节内容)

### 1. 打开终端，定位到你的项目根目录

假设你目录是 `D:\mdbook`：

```bash
cd D:\mdbook
```

### 2. 初始化 Git（如果还没初始化）

```bash
git init
```

### 3. 添加远程仓库地址

```bash
git remote add origin https://github.com/你的用户名/my-mdbook.git
```




---

## ✅ 官方版本的三条命令作用如下：

```bash
git remote add origin https://github.com/MonkeyLoveIU/my-mdbook.git  
git branch -M main  
git push -u origin main
```


---

## 🧠 如果你刚初始化项目，完整流程应是：

```bash
# 1. 初始化本地仓库（你已完成）
git init

# 2. 添加所有文件
git add .

# 3. 创建首次提交（不能写 -M，应该是 -m）
git commit -m "initial commit"

# 4. 设置远程仓库地址
git remote add origin https://github.com/MonkeyLoveIU/my-mdbook.git

# 5. 重命名当前分支为 main（如非 main）
git branch -M main

# 6. 推送到远程 GitHub，并关联本地分支 （如果网络问题等未成功，请尝试SSH连接，参考第六节内容）
git push -u origin main
```

---

## ✅ TL;DR 总结一句话：

> ✔️ **你已经 commit 了，再执行这 3 条就足够了**：

```bash
git remote add origin https://github.com/MonkeyLoveIU/my-mdbook.git  
git branch -M main  
git push -u origin main
```

否则，请记得先执行：

```bash
git add .
git commit -m "initial commit"
```

---

✅ 推送成功后，我们就可以进行 **GitHub Pages 自动部署配置**。








---

## ✅ 三、配置 GitHub Pages 自动部署 mdBook 网站

### 方法一：**使用 GitHub Actions 自动部署（推荐）**

mdBook 官方推荐使用 Actions 自动构建并发布到 `gh-pages` 分支。
你只需要**添加一个 workflow 文件**即可。

---

### 🔧 1. 创建目录 `.github/workflows/` 和部署文件

在你的本地项目中新建文件：

```
.github/workflows/deploy.yml
```

内容如下（可直接复制）👇

```yaml

name: Deploy mdBook site to Pages

on: 
  # Runs on pushes targeting the default branch
  push: 
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Rust and mdBook
        run: |
          curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf -y | sh
          rustup update
          cargo install mdbook
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Build with mdBook
        run: mdbook build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./book

  # Deployment job
  deploy: 
    environment: 
      name: github-pages 
      url: ${{ steps.deployment.outputs.page_url }} 
    runs-on: ubuntu-latest 
    needs: build 
    steps: 
      - name: Deploy to GitHub Pages 
        id: deployment 
        uses: actions/deploy-pages@v4

```


---

### 🔧 2. 启用 GitHub Pages

进入你的仓库页面：

* 点右上角 `⚙️ Settings`
* 左边栏点击 `Pages`
* 选择：

  * `Source` → `Deploy from a branch`
  * `Branch` → `main`
  * `Folder` → `/ (root)`

然后保存 ✅

🚀 你的 mdBook 网页就发布了，地址是：

```
https://你的用户名.github.io/仓库名/
```

---

## ✅ 四、后续更新流程

1. 修改你的 Markdown 或样式文件
2. 使用 Git 提交并推送：

```bash
git add .
git commit -m "更新内容"
git push
```

add 命令

### 1. **同时添加多个文件**

你可以在一个 `git add` 命令中列出多个文件，像这样：

```bash
git add src/chapter2.md SUMMARY.md
```

这会将 **`chapter2.md`** 和 **`SUMMARY.md`** 文件都添加到暂存区。

---

### 2. **添加整个目录**

如果你想添加某个目录下的所有文件，可以使用：

```bash
git add src/
```

这会将 `src/` 目录下的所有修改过的文件添加到暂存区。如果你只想添加特定类型的文件（比如 `.md` 文件），也可以使用通配符：

```bash
git add src/*.md
```

---

### 3. **一次性添加所有修改的文件**

如果你想一次性添加所有已修改的文件，可以使用：

```bash
git add .
```

这个命令会把当前目录下的所有已修改和新增的文件都添加到暂存区。

---

### 4. **查看暂存区内容**

你可以在 `git add` 之后，使用以下命令来查看已经加入暂存区的文件：

```bash
git status
```

这会列出所有已暂存的文件，帮助你确认是否所有需要的文件都被添加。

---

### 5. **提交所有文件**

一旦你将文件添加到暂存区，执行以下命令提交所有更改：

```bash
git commit -m "Add Chapter 2 and update SUMMARY.md"
git push
```

---



3. 然后 **GitHub 会自动构建并发布**

你只需要等待 1\~2 分钟后刷新网页即可看到更新 ✨

---

---

## 🎯 总结流程图

```
[本地 mdBook 项目]
       ↓
  git push 到 main 分支
       ↓
[GitHub Actions 自动构建]
       ↓
  构建 book/ 输出目录
       ↓
自动部署到 gh-pages 分支
       ↓
  GitHub Pages 发布网页
```

