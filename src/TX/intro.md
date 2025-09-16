<!-- timestamp inserted -->
> 📄 创建时间：2025-08-08 19:37:10  
> 🛠️ 修改时间：2025-08-08 19:37:10

# Deepseek R1

## 一、概述

欢迎使用 Cloud Studio DeepSeek 工作空间！我们已为您预装并启动了以下服务，等待加载十几秒即可查看效果：  

- **Ollama 服务**：支持通过 API 调用 DeepSeek 模型。  
- **AnythingLLM 前端服务**：提供交互式聊天界面，支持知识库上传并基于知识库进行问答。
- **Open WebUI 前端服务**：提供交互式聊天界面，支持上传文件作为上下文进行问答。  
- **预装模型**：  
  - `DeepSeek-R1-Distill-Qwen-1.5B`：适合轻量级任务，如简单文本生成、基础问答和低资源设备上的应用。
  - `DeepSeek-R1-Distill-Qwen-7B`：适合中等复杂度任务，如文本摘要、翻译、对话生成和内容创作。
  - `DeepSeek-R1-Distill-Llama-8B`：与7B类似，性能略有提升，适合更复杂的文本生成和理解任务。
  - `DeepSeek-R1-Distill-Qwen-14B`：适合高复杂度任务，如长文本生成、深度问答、知识推理和高级对话系统。
  - `DeepSeek-R1-Distill-Qwen-32B`：适合高精度任务，如复杂推理、大规模知识库问答、专业领域内容生成和研究级应用。

## 二、使用教程

您可以通过 Open WebUI、通过 AnythingLLM 管理知识库并对话、通过命令行调用模型、使用Ollama 原生命令对话。

### 一、通过 Open WebUI 快速体验

我们提供了一个开箱即用的聊天界面，您可以直接通过浏览器与模型交互。点击红框区域，即可新页面打开聊天页面。

<img title="" src="img\open1.png" alt="" width="500">

#### 操作步骤：

1. **访问 Chat UI**  
   当前环境已配置为默认启动该服务，可直接访问。如果希望修改启动命令，可以前往[.vscode/preview.yml](.vscode/preview.yml)修改。

2. **选择模型**  
   在界面右上角的下拉菜单中，选择想要用的模型。  
   
   <img title="" src="img\open3.png" alt="" width="500">

3. **开始对话**  
   输入问题或指令，点击「发送」即可获取模型回复。  

### 二、通过 AnythingLLM 管理知识库并对话

我们提供了一个开箱即用的聊天界面，您可以直接通过浏览器与模型交互。等待页面加载完成即可查看到下图中的界面。点击红框区域，即可新页面打开聊天页面。并点击`New Workspace`创建工作区

<img title="" src="img\openInBrowser.png" alt="" width="500">

如没有看到预览页面，可按数字点击下方按钮，即可看到预览页面。

<img title="" src="img\open2.png" alt="" width="500">

#### 操作步骤：

1. **访问 Open WebUI**  
   当前环境已配置为默认启动该服务，可直接访问。如果希望修改启动命令，可以前往[.vscode/preview.yml](.vscode/preview.yml)修改。

2. **选择模型**  
   在界面右上角的下拉菜单中，选择 `deepseek-r1:1.5b` 或 `deepseek-r1:7b`。  

3. **开始对话**  
   输入问题或指令，点击「发送」即可获取模型回复。  
   
   <img title="" src="img\anything1.png" alt="" width="500">

4. **上传知识库**  
   点击`Upload`按钮，选择本地文件，即可上传知识库。
   
   <img title="" src="img\anything2.png" alt="" width="200">
   
   <img title="" src="img\anything5.png" alt="" width="500">

> 需注意,该浏览地址仅在当前工作空间内有效,如果关闭工作空间,则无法访问。所以请保持当前编辑器标签页，不要关闭。

#### 常见问题：

1. **修改系统语言**  
   点击`Settings`按钮，选择`Language`，即可修改系统语言。
   
   <img title="" src="img\anything3.png" alt="" width="500">
   
   <img title="" src="img\anything4.png" alt="" width="500">

2. **在其他设备打开**  
   复制链接地址并打开。也可hover下方红框处并扫码，即可在移动端打开 
   
   <img title="" src="img\anything6.png" alt="" width="400">

---

### 三、通过命令行调用模型

您可以使用 `curl` 直接与 Ollama 服务交互，适用于自动化任务或脚本调用。  

#### 基础请求示例

##### 调用 `deepseek-r1:1.5b`

```bash
curl -X POST http://localhost:8434/api/generate \
     -H "Content-Type: application/json" \
     -d '{
           "model": "deepseek-r1:1.5b",
           "prompt": "用一句话解释量子计算",
           "stream": false
         }'
```

##### 调用 `deepseek-r1:7b`

```bash
curl -X POST http://localhost:8434/api/generate \
     -H "Content-Type: application/json" \
     -d '{
           "model": "deepseek-r1:7b",
           "prompt": "写一篇关于可再生能源的短文（200字）",
           "stream": false
         }'
```

#### 流式输出（实时逐句返回）

将 `stream` 参数设为 `true`：  

```bash
curl -X POST http://localhost:8434/api/generate \
     -H "Content-Type: application/json" \
     -d '{
           "model": "deepseek-r1:7b",
           "prompt": "详细说明如何训练一个神经网络",
           "stream": true
         }'
```

---

### 四、Ollama 原生命令进阶使用

除了 HTTP API，您还可以直接通过 `ollama` 命令行工具与模型交互。  

#### 1. 查看已安装模型

```bash
ollama list  
```

输出示例：  

```
NAME                SIZE  
deepseek-r1:1.5b    1.5B  
deepseek-r1:7b      7B  
```

#### 2. 启动交互式对话

```bash
ollama run deepseek-r1:1.5b  
```

输入 `/bye`或者点击 `Ctrl + D` 退出对话。  

**示例对话流程**：  

```
>>> 推荐一个适合初学者的机器学习项目  
DeepSeek: 一个手写数字识别系统是一个不错的入门项目，可以使用MNIST数据集和Python的scikit-learn库快速实现...  

>>> 如何评估模型性能？  
DeepSeek: 常用方法包括划分训练集/测试集、交叉验证、计算准确率/精确率/召回率等指标...  

>>> /bye  
```

#### 3. 模型管理

| 命令                           | 说明            |
| ---------------------------- | ------------- |
| `ollama pull deepseek-r1:7b` | 重新拉取模型（更新时使用） |
| `ollama rm deepseek-r1:7b`   | 删除模型          |

---

#### 4. 切换模型

如需切换到7B模型，可在退出当前进程后再次输入以下代码即可：

```bash
ollama run deepseek-r1:7b
```

注意：当前机器为CPU，7B模型推理速度较慢，建议使用1.5B模型。更大参数模型建议使用HAI进阶型。

## 三、常见问题

### 1. 查看预览

如需了解更多使用内置web预览的介绍，可参考文档：[Cloud Studio（云端 IDE）操作指南-在线预览调试-文档中心-腾讯云](https://cloud.tencent.com/document/product/1039/72032)

### 2. 端口占用

如果需要释放端口，关闭某个进程，可以通过下述命令查看端口占用情况：

```bash
lsof -i -P -n
```

再使用下述命令关闭进程：

```bash
kill -9 <进程ID>
```

### 3. 空间不足

如右下角提示空间不足，可点击右下角的“2核4G”，选择“旗舰型”，即可升级空间。

<img title="" src="img\update.png" alt="" width="259">

### 4. 免费版工作空间时长用完如何继续使用?

免费版主要用于帮助用户体验产品功能，暂不支持续费。可等待下个月再次发放时长后继续使用。

## 三、相关文档与资源

（1）Deepseek 官方介绍文档：
[GitHub - deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)

（2）Ollama 官方介绍文档：
[GitHub - ollama/ollama](https://github.com/ollama/ollama)

（3）Cloud Studio操作指南：
[Cloud Studio（云端 IDE）操作指南-文档中心-腾讯云](https://cloud.tencent.com/document/product/1039)

## 四、更多帮助和支持

### 欢迎加入Cloud Studio用户反馈群

当您遇到问题需要处理时，您可以直接通过到扫码进入Cloud Studio用户群进行提问.

- 腾讯云工程师实时群内答疑
- 扫码入群可先享受产品上新功能
- 更多精彩活动群内优享

<img title="" src="img\image.png" alt="" width="259">