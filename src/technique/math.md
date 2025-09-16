<!-- timestamp inserted -->
> 📄 创建时间：2025-08-05 03:36:09  
> 🛠️ 修改时间：2025-08-05 03:36:09



---

## 🧭 全流程：在 mdBook 中启用数学公式（KaTeX 支持）

### 📍前提：你要使用的方法是「官方推荐的 `mdbook-katex` 插件」

---

### ✅ 第一步：确认是否安装了 Rust（mdbook 是 Rust 项目）

在终端中运行：

```bash
rustc --version
```

如果提示 `command not found` 或不是版本号，说明你还没装 Rust。

#### ➕ 没装？那就执行这条命令安装 Rust：

这个提示说明：**你的系统中还没有安装 Rust**，或者安装了但没有添加到环境变量中。

---

## ✅ 你需要先安装 Rust 才能使用 `mdbook-katex` 插件

mdBook 是用 Rust 编写的工具，它的插件（例如 `mdbook-katex`）也都是通过 Rust 的构建工具 `cargo` 来安装的。所以我们第一步要做的就是：

---

### ✅ 一步安装 Rust（包括 cargo 和 rustc）：

请在 PowerShell 中复制并运行以下命令：

```powershell
Invoke-WebRequest -Uri https://win.rustup.rs -OutFile rustup-init.exe; Start-Process .\rustup-init.exe
```

> 这是官方提供的 Rust 安装器，会弹出一个安装界面，默认选项一般就可以。

---

Rust 安装程序在 Windows 上的一个提示，意思是：

> Rust 编译器需要一些 Windows 系统组件（比如链接器、API 头文件），而你的系统目前没有这些。

这是正常的，**在 Windows 上安装 Rust 时，必须配合安装 C++ 构建工具（来自 Visual Studio）** 才能正常使用。

---

## ✅ 推荐选择：**输入 `1` 然后回车**（自动下载安装）

这是最简单的方式，会帮你：

* 安装 **Visual Studio 的最小依赖版本**
* 包含 Rust 构建所需的 C++ 工具链（如 `link.exe`, `cl.exe`）

输入：

```text
1
```

然后回车。

它会启动 **Visual Studio Installer** 并自动下载“C++构建工具”，这对 mdBook 插件（如 `mdbook-katex`）安装是必要的。

---

### 🧭 选项解释（供你参考）：

| 选项 | 说明                              | 是否推荐    |
| -- | ------------------------------- | ------- |
| 1  | 自动安装 Visual Studio C++ 编译组件（推荐） | ✅ 推荐    |
| 2  | 手动安装依赖，适合高级用户                   | ❌ 新手不建议 |
| 3  | 不安装，仅限特殊情况（如目标是 GNU ABI）        | ❌ 一般不要选 |

---

### ⏳ 下载时间说明：

* 这个安装包是 Visual Studio C++ 编译环境的一部分（通常在 500MB 左右）。
* 过程可能需要 5\~15 分钟，取决于你的网络。

安装完成后重新打开终端，就可以运行：

```bash
cargo install mdbook-katex
```

---

如果你在安装过程中遇到任何问题（比如下载失败、权限不足），告诉我，我可以帮你处理或给出手动安装的方法。完成后我们就可以继续构建支持数学公式的 mdBook！









### 🧭 安装完成后：

1. **重启 PowerShell 或终端**（非常重要！）让环境变量生效。
2. 验证安装是否成功：

   ```bash
   rustc --version
   cargo --version
   ```

   如果看到版本号，比如：

   ```bash
   rustc 1.75.0
   cargo 1.75.0
   ```

   就说明你已经成功安装 Rust ✅

---

### 🧱 接下来你就可以继续：

```bash
cargo install mdbook-katex
```

然后编辑 `book.toml`，插入公式，构建项目，一步步启用公式支持。













---

# 2. Rust 环境手动安装（适用于 Windows / macOS / Linux）

## 📌 第 1 步：安装 Rust 工具链

Rust 官方提供了一个安装工具 `rustup`，它会自动安装好以下内容：

* `rustc`：Rust 编译器
* `cargo`：Rust 构建工具和包管理器
* `rustup`：版本管理器

---

## 💻 一、Windows 安装

### ✅ 方法一：使用官方安装器（推荐）

1. 打开官网 [https://rust-lang.org](https://www.rust-lang.org/)
2. 点击 “Get Started”
3. 下载 `rustup-init.exe` 安装器并运行
4. 会弹出命令行窗口，输入 `1` 开始默认安装（或直接回车）

📦 安装完成后，关闭窗口，重新打开 **PowerShell 或 CMD**，输入：

```bash
rustc --version
cargo --version
```

✅ 出现版本号说明安装成功。

---

### ✅ 方法二：使用命令行安装

如果你喜欢命令行操作：

1. 打开 PowerShell 或 CMD
2. 输入以下命令：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

3. 跟随提示按 Enter 回车安装即可。

---

## 🍎 二、macOS 安装

### ✅ 使用 Homebrew（推荐）

打开终端，输入：

```bash
brew install rustup-init
rustup-init
```

按提示安装即可。完成后重启终端，检查版本：

```bash
rustc --version
cargo --version
```

---

## 🐧 三、Linux 安装

### ✅ 通用安装命令：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```






---



提示：
```bash
Rust requires a linker and Windows API libraries but they don't seem to be
available.
 
These components can be acquired through a Visual Studio installer. 
 
1) Quick install via the Visual Studio Community installer 
   (free for individuals, academic uses, and open source). 
 
2) Manually install the prerequisites 
   (for enterprise and advanced users). 
 
3) Don't install the prerequisites 
   (if you're targeting the GNU ABI). 

```





这个提示是 Rust 编译器找不到 **链接器（linker）**，也就是说编译 Rust 代码时，需要用到的 Windows 系统底层工具没安装好。具体原因和解决方案如下：

---

## ❶ 产生原因

* Rust 编译器需要调用微软的 C++ 编译工具链（MSVC），包括链接器 `link.exe`。
* 你的系统没安装 Visual Studio 相关的 **C++ 构建工具**，或者没安装 Windows SDK。
* 如果你用的是 **MSVC 版本的 Rust**（默认），就必须安装微软提供的工具链。

---

## ❷ 解决方案

### 方法一：安装 Visual Studio 的“C++桌面开发”工作负载

1. 如果没装 Visual Studio，可以从官网免费安装：

   [https://visualstudio.microsoft.com/zh-hans/downloads/](https://visualstudio.microsoft.com/zh-hans/downloads/)

   选择 **Visual Studio Community 2022**。

2. 运行安装程序，选择以下工作负载（Workloads）：

   * “使用 C++ 的桌面开发” (Desktop development with C++)

3. 安装完成后，Rust 就能找到必要的链接器。

---

### 方法二：只安装“构建工具”（Build Tools for Visual Studio）

如果你不想安装完整的 VS IDE，只需安装：

[https://aka.ms/buildtools](https://aka.ms/buildtools)

安装时勾选：

* C++ build tools
* Windows 10 SDK（或你系统对应版本的 SDK）

---

### 方法三：安装 `mingw-w64` 并切换 Rust 到 GNU ABI

这是另一种方案，但较少用。除非你熟悉 GNU 工具链，否则建议前两种。

---

## ❸ 如何验证

安装好 Visual Studio 的 C++ 工具后， 打开Rust安装，重新打开终端，执行：

```bash




The Cargo home directory is located at:
 
  C:\Users\lenovo\.cargo 
 
This can be modified with the CARGO_HOME environment variable. 
 
The cargo, rustc, rustup and other commands will be added to 
Cargo's bin directory, located at: 
 
  C:\Users\lenovo\.cargo\bin 
 
This path will then be added to your PATH environment variable by 
modifying the PATH registry key at HKEY_CURRENT_USER\Environment. 
 
You can uninstall at any time with rustup self uninstall and
these changes will be reverted.
 
Current installation options: 
 
 
   default host triple: x86_64-pc-windows-msvc 
     default toolchain: stable (default) 
               profile: default 
  modify PATH variable: yes 
 
1) Proceed with standard installation (default - just press enter) 
2) Customize installation 
3) Cancel installation 
>















Microsoft Windows [版本 10.0.26100.4652]
(c) Microsoft Corporation。保留所有权利。

C:\Users\lenovo>cargo --version
cargo 1.88.0 (873a06493 2025-05-10)

C:\Users\lenovo>rustc --version
rustc 1.88.0 (6b00bc388 2025-06-23)

C:\Users\lenovo>D:

D:\>cd \mdbook

D:\mdbook>cargo install mdbook-katex
```

太好了！你现在已经运行到了 Rust 安装器的关键界面 ✅
只需要做一件事：

---

## ✅ **直接按下 `Enter` 键**（选择默认的第 1 项）

也就是：

```
1) Proceed with standard installation (default - just press enter)
```

**不要输入数字**，直接敲 **Enter**，Rust 就会开始自动安装。

---

## 🧠 安装说明解读一下你看到的内容：

* ✅ Rust 将安装到：

  ```
  C:\Users\lenovo\.cargo
  ```
* ✅ 所有命令（如 `cargo`, `rustc`）都会放在：

  ```
  C:\Users\lenovo\.cargo\bin
  ```
* ✅ 安装器会自动将这个路径加到你的系统环境变量 `PATH` 中（你无需手动操作）

---

## ⏳ 安装完成后

等待安装完成，大概需要几分钟（视网速而定），然后你会看到如下提示：

```
Rust is installed now. Great!

To get started you may need to restart your shell.
```

---

## ✅ 最后验证（关键）

关闭当前窗口，**重新打开 CMD 或 PowerShell**，然后输入：

```bash
cargo --version
rustc --version
```

如果出现类似输出：

```
cargo 1.78.0
rustc 1.78.0
```

就表示一切配置完成，可以使用 Rust 和 mdBook 了！

---

下一步你可以继续：

```bash
cargo install mdbook
cargo install mdbook-katex
```

要我帮你一起执行、解释后续 mdBook 配置吗？也可以一步步教你写数学公式的 md 文件。只要你说。


---

## 额外建议

* 安装 VS 或构建工具时，最好关闭杀毒软件，避免安装中断。
* Rust 默认使用 MSVC 工具链，只要安装对应工具，Rust 就可以正常编译。
* 你也可以用 VS Code 打开 Rust 项目，`rust-analyzer` 会提示你缺少构建工具。

---




太好了，我们现在正式进入你关心的核心内容：

---

# 🦀 配置 mdBook 并支持数学公式（KaTeX）

我们一起来执行、配置，并解释每一步。

---

## ✅ 第 1 步：安装 `mdBook`

### 在 CMD 或 PowerShell 中输入：

```bash
cargo install mdbook
```

🔧 这会安装 `mdbook` 命令，等它显示：

```
Installing mdbook v0.x.x
...
Finished release [optimized] target(s)
```

然后检查是否安装成功：

```bash
mdbook --version
```

✅ 有版本号输出表示安装成功。

---

## ✅ 第 2 步：创建一个 mdBook 项目

你可以先建个新目录：

```bash
mdbook init my-math-book
cd my-math-book
```

然后运行：

```bash
mdbook serve
```

浏览器会打开：[http://localhost:3000](http://localhost:3000)
看到 mdBook 页面，表示基本框架已成功！

---

## ✅ 第 3 步：安装数学公式支持插件 `mdbook-katex`

```bash
cargo install mdbook-katex
```

这是让你能用 `$E=mc^2$` 或 `$$公式$$` 来写数学公式的关键。

---

## ✅ 第 4 步：配置 `book.toml`

找到项目目录里的 `book.toml` 文件（就在 `my-math-book/` 下），打开并添加以下内容：

```toml
[book]
title = "我的数学书"
authors = ["你的名字"]

[output.html]

[preprocessor.katex]
```

这段 `[preprocessor.katex]` 是启用数学公式渲染的关键。

---

## ✅ 第 5 步：写一个带公式的 Markdown 文件

打开 `src/SUMMARY.md`，链接一个新章节：

```markdown
# Summary

- [介绍](introduction.md)
```

然后新建 `src/introduction.md`，写入：

```markdown
# 数学公式测试

这是一个行内公式：$E = mc^2$

这是一个块级公式：

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
```

---

## ✅ 第 6 步：运行并预览

在项目目录下运行：

```bash
mdbook serve
```

然后访问 [http://localhost:3000](http://localhost:3000) 查看效果！

你应该会看到公式已经被漂亮地渲染出来 ✅

---

## ❗ 常见错误排查

| 问题                | 解决办法                                           |
| ----------------- | ---------------------------------------------- |
| 数学公式没渲染           | 检查 `book.toml` 中是否包含 `[preprocessor.katex]`    |
| 运行时无 katex 插件生效提示 | 确保你运行的是 `mdbook serve`，不是 VSCode 的 Markdown 预览 |
| 页面加载失败            | 检查是否在项目目录中运行 `mdbook serve`                    |

---

## ✅ 后续你可以做的

* 添加更多页面、章节（只需修改 `SUMMARY.md`）
* 支持图表（可以安装 `mdbook-mermaid`）
* 自定义主题风格

---





然后测试安装是否成功：

```bash
rustc --version
cargo --version
```

---



```










---

## 🛠 第 3 步：可选工具推荐

| 工具              | 用途                  | 安装方法                           |
| --------------- | ------------------- | ------------------------------ |
| `rust-analyzer` | 编辑器代码提示（VS Code 推荐） | 在 VS Code 插件市场安装               |
| `clippy`        | 代码风格检查              | `rustup component add clippy`  |
| `rustfmt`       | 自动格式化代码             | `rustup component add rustfmt` |

---

## 🧠 附：卸载 Rust

若需要卸载，可执行：

```bash
rustup self uninstall
```

---

## 🧭 教程推荐（中文）

* [Rust官方中文文档](https://rustwiki.org/zh-CN/book/)（也叫“Rust 程序设计语言”）
* [Rust by Example 中文版](https://rustwiki.org/zh-CN/rust-by-example/)

---

