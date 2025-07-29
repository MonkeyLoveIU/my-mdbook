

### 🔧 一、安装 Git for Windows

1. 打开官网：[https://git-scm.com](https://git-scm.com)
2. 点击绿色按钮 `Download for Windows`（会自动识别版本）
3. 下载后双击安装，**一路默认即可**，但注意下面几点设置：

### ✅ 安装时建议保留的关键选项：


你现在看到的是 Git for Windows 安装过程中的 “**Additional Icons**（附加选项）” 页面，
以下是每个选项的作用，以及我推荐是否勾选的建议 ✅

---

## ✅ 推荐勾选的选项如下：

| 选项                                                          | 推荐 | 原因                                   |
| ----------------------------------------------------------- | -- | ------------------------------------ |
| ✅ **Windows Explorer integration**                          | ✔️ | 在资源管理器右键菜单中添加 Git（超实用）               |
| ✅ **Open Git Bash here**                                    | ✔️ | 右键任意文件夹快速打开 Git Bash                 |
| ✅ **Open Git GUI here**                                     | ✔️ | 如果你想用图形界面操作 Git，可保留                  |
| ⛔ **Git LFS (Large File Support)**                          | ❌  | 如果你不管理大文件（如视频、模型等），不用选               |
| ✅ **Associate .git\* configuration files with text editor** | ✔️ | `.gitconfig` 等文件可自动用编辑器打开            |
| ✅ **Associate .sh files to run with Bash**                  | ✔️ | 方便执行 `.sh` 脚本文件（尤其是你以后学 Linux）       |
| ⛔ **Check daily for Git for Windows updates**               | ❌  | 不推荐，每天弹窗很烦，可以手动更新                    |
| ✅ **(NEW!) Add a Git Bash Profile to Windows Terminal**     | ✔️ | 如果你用 Win10/11 的 Windows Terminal，推荐选 |

## ✅ 最终推荐勾选如下：

✅ 建议你勾选这些：

* ✔ Windows Explorer integration
* ✔ Open Git Bash here
* ✔ Open Git GUI here（可选）
* ❌ Git LFS
* ✔ Associate `.git*` files
* ✔ Associate `.sh` files
* ❌ Check daily updates
* ✔ Add Git Bash to Windows Terminal（推荐）

---

## 💡 总结一句话：

> 安装时除了 `Git LFS` 和 `Check for updates` 不勾选，其余都可以选 ✔️，不影响 Git 的正常使用，还能提升体验。



---

### 🔄 安装完成后，你可以重新打开命令行（重要！）：

然后输入：

```bash
git --version
```

看到类似输出：

```
git version 2.44.0.windows.1
```

说明安装成功 ✅

---

### 📦 附赠：安装完 Git，你会获得这些工具：

| 工具           | 用法                      |
| ------------ | ----------------------- |
| `git`        | 用于版本控制、同步到 GitHub       |
| **Git Bash** | 类 Unix 的终端，支持更强命令（推荐使用） |
| **Git GUI**  | 可视化操作工具                 |

---

### 🧭 然后你就可以继续：

```bash
cd D:\mdbook
git init
git add .
git commit -m "initial commit"
git push -u origin main
```

---


