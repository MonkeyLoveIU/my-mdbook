<!-- timestamp inserted -->
> 📄 创建时间：2025-07-29 15:37:59  
> 🛠️ 修改时间：2025-07-29 15:37:59

# MdBook 使用



---

## 1. Windows 本机安装 mdBook


### 方法：直接下载预编译的 mdBook

1. 访问官方发布页：[https://github.com/rust-lang/mdBook/releases](https://github.com/rust-lang/mdBook/releases)
2. 找到最新版本的 Windows 64-bit zip 文件（比如 `mdbook-v0.xx.x-x86_64-pc-windows-msvc.zip`）下载并解压

3. 将解压出来的 `mdbook.exe` 复制到一个你喜欢的位置，比如：

   ```
   D:\tools\mdbook\
   ```

4. **配置环境变量**

   把 `D:\tools\mdbook\` 这个路径添加到系统环境变量 `PATH` 中。

   * 右键“此电脑” → 属性 → 高级系统设置 → 环境变量 → 找到 `Path` → 编辑 → 新增 → 输入 `D:\tools\mdbook\`

5. 重新打开命令行窗口，输入：

   ```cmd
   mdbook --version
   ```

   如果看到版本号说明安装成功。


---

### 二、安装好后，就可以继续之前的写书流程啦：

初始化书籍结构

```cmd
mdbook init

```


1. 当出现提示：

```
Do you want a .gitignore to be created? (y/n)
```

输入 `y`，然后回车。

2. 紧接着出现：

```
What title would you like to give the book?
```

这时候你需要输入书名，比如：

```
我的第一本书
```

然后回车。

---


* 回答 `.gitignore` 提示时，输入：`y`
* 回答标题时，输入你喜欢的书名，比如：`我的第一本书`

这样初始化的书才会有正确的标题。



---


## 2. 启动本地预览服务器

```cmd
mdbook serve
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 就能看到你写的书。

---

## 3. 你可以用文本编辑器（如 VSCode）打开 `src/README.md` 和 `src/SUMMARY.md` 修改内容和目录。

---








## 4. 目录介绍



```cmd
dir
```

---

### ✅ 正确 & 有用的内容：

| 名称          | 说明                                       |
| ----------- | ---------------------------------------- |
| `book/`     | ✅ **mdBook 编译输出目录**，会自动生成，不建议手动修改        |
| `book.toml` | ✅ **项目配置文件**，控制主题、构建设置等                  |
| `src/`      | ✅ **写书内容目录**，放你的 Markdown 章节             |
| `theme/`    | ✅ （可选）**自定义主题**文件夹，如果你自定义了 CSS/HTML 就保留  |
| `.github/`  | ✅ （可选）CI/CD 用，比如自动部署 GitHub Pages，用得上就保留 |

