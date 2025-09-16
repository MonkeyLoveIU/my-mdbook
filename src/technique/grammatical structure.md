<!-- timestamp inserted -->
> 📄 创建时间：2025-07-29 15:37:59  
> 🛠️ 修改时间：2025-07-29 15:37:59

好的！以下是你想要的：

---

## ✅ 一、`mdBook` 的目录结构说明（基础结构）

mdBook 项目的标准目录结构如下：

```
your-book/
├── book.toml          # ✅ 配置文件，控制标题、主题、输出路径等
├── src/               # ✅ Markdown 内容目录（写书主要在这）
│   ├── SUMMARY.md     # ✅ 目录结构文件，控制章节顺序和导航
│   ├── README.md      # ✅ 首页内容，对应书的首页
│   ├── chapter_1.md   # ✅ 你的第一章（章节名自定义）
│   └── ...            # ✅ 其他章节
├── book/              # 🔁 构建生成的静态网页（`mdbook build` 自动生成）
├── theme/             # 🎨 可选，自定义主题目录（CSS/HTML）
└── .github/           # 🚀 可选，CI/CD 发布脚本目录（如 GitHub Pages）
```

---

## ✅ 二、`book.toml` 配置文件（最小示例）

```toml
[book]
title = "我的第一本书"
author = "KEY mon"
language = "zh"

[output.html]
default-theme = "light"
```

---

## ✅ 三、`SUMMARY.md`：目录结构控制

`src/SUMMARY.md` 是你书的**目录导航**，语法简单，用 Markdown 列表语法来组织章节：

```md
# Summary

- [首页介绍](README.md)
- 第一部分
  - [第一章：起点](chapter_1.md)
  - [第二章：中途](chapter_2.md)
- 第二部分
  - [第三章：终点](chapter_3.md)
```

---

## ✅ 四、Markdown 编写语法大全（mdBook 支持的）

### 📄 文本样式

```md
**加粗**、*斜体*、~~删除线~~、`代码片段`
```

### 🔗 链接与图片

```md
[点击跳转](https://example.com)
![图片描述](https://example.com/image.png)
```

### 📦 代码块 

以 ``` 开头结尾

````md
```rust
fn main() {
    println!("Hello mdBook!");
}
````

支持高亮的语言有：`rust`、`js`、`python`、`bash` 等

### 📌 引用（引用块）> 



```md
> 这是引用文本
```

### 📋 列表 

* 无序列表

  * 子项

1. 有序列表
2. 第二项

### 📐 表格

```md
| 名称     | 说明         |
|----------|--------------|
| `README` | 首页内容     |
| `SUMMARY`| 目录结构控制 |
```

### 🪧 提示框（mdBook 特有）

mdBook 支持一些特别的注释块：

```md
> **注意：** 这是一个提示块

> **提示：** 有用的建议

> **警告：** 小心使用的内容
```
