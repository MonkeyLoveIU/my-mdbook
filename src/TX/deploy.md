<!-- timestamp inserted -->
> 📄 创建时间：2025-08-09 02:42:57  
> 🛠️ 修改时间：2025-08-09 02:42:57


# 云服务器上中文情感分类模型微调与部署全流程实战

## 目录

1. [项目介绍](#项目介绍)  
2. [环境准备](#环境准备)  
3. [数据准备](#数据准备)  
4. [模型微调](#模型微调)  
5. [Gradio 前端搭建](#gradio-前端搭建)  
6. [公网访问与隧道工具 ngrok](#公网访问与隧道工具-ngrok)  
7. [总结与扩展](#总结与扩展)  
8. [项目文件结构](#项目文件结构)

---

## 项目介绍

本项目旨在演示如何在腾讯云服务器上完成中文情感分类模型的微调和在线部署，涵盖从数据准备、模型训练、服务搭建到公网访问的完整技术流程。  
核心技术栈包括 Huggingface Transformers、Datasets、Gradio 和 ngrok。

---

## 环境准备

- 云服务器操作系统：Ubuntu 20.04  
- Python 3.8 及以上版本  
- 依赖包安装命令：

```bash
apt update && apt install -y python3 python3-pip git 


# 安装 GPU 支持的深度学习框架

# 以 PyTorch 为例（CUDA 12.4 对应版本）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124 


pip install transformers datasets accelerate




---

## 数据准备


新建一个 `test_model.py`：

```python
from transformers import pipeline

# 加载中文情感分析模型
classifier = pipeline(
    "sentiment-analysis",
    model="uer/roberta-base-finetuned-jd-binary-chinese",
    device=0  # GPU:0
)

# 测试几句话
texts = [
    "这个产品真的很好用！",
    "我非常失望，质量太差了。",
    "一般般，没有特别惊艳的地方。"
]

for t in texts:
    print(t, "=>", classifier(t))
```

运行：

```bash
python test_model.py
```

你会看到三句话分别被标注为积极（positive）或消极（negative）。

这个产品真的很好用！ => [{'label': 'positive (stars 4 and 5)', 'score': 0.976917028427124}]
model.safetensors:   5%|████▋                                                                                       | 21.0M/409M [00:01<00:21, 18.3MB/s]我非常失望，质量太差了。 => [{'label': 'negative (stars 1, 2 and 3)', 'score': 0.9843776226043701}]
一般般，没有特别惊艳的地方。 => [{'label': 'negative (stars 1, 2 and 3)', 'score': 0.5168154239654541}]
model.safetensors: 100%|█████████████████████████████████████████████████████████████████████████████████████████████| 409M/409M [00:33<00:00, 12.2MB/s]


















## 模型微调

我们进入 **阶段 3：微调模型**，一步步来。


---

## **📌 阶段 3：微调中文情感分析模型**

### 1. 安装依赖

先安装 Hugging Face 训练所需工具：

```bash
pip install transformers datasets accelerate evaluate
```

---

### 2. 创建训练脚本 `finetune_sentiment.py`
<details>
  <summary>代码</summary>

```python
from datasets import Dataset
import pandas as pd
import evaluate
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer

# 1. 读取 CSV 并转成 Dataset
df = pd.read_csv("data/chnsenticorp.csv")  # 确保文件路径正确
dataset = Dataset.from_pandas(df)

# 2. 拆分数据集（80%训练，20%验证）
split_dataset = dataset.train_test_split(test_size=0.2, seed=42)
train_dataset = split_dataset["train"]
eval_dataset = split_dataset["test"]

# 3. 加载分词器和模型
model_name = "uer/roberta-base-finetuned-jd-binary-chinese"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# 4. 定义分词函数
def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=128)

# 5. 对训练集和验证集做分词
train_dataset = train_dataset.map(preprocess_function, batched=True)
eval_dataset = eval_dataset.map(preprocess_function, batched=True)

# 6. 加载评价指标
accuracy = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return accuracy.compute(predictions=predictions, references=labels)

# 7. 训练参数配置
training_args = TrainingArguments(
    output_dir="./results",
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=2,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=50,
    push_to_hub=False,
    load_best_model_at_end=False,
    fp16=True
)

# 8. 创建 Trainer 实例
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics
)

# 9. 开始训练
trainer.train()

# 10. 保存模型和分词器
trainer.save_model("./my-chinese-sentiment")
tokenizer.save_pretrained("./my-chinese-sentiment")

print("✅ 训练完成，模型已保存到 ./my-chinese-sentiment")


```

运行：

```bash
python test_my_model.py
```



</details>




执行 **python finetune_sentiment.py**报错

<details>
  <summary>报错解释</summary>

你这个报错是因为 load_dataset("chnsenticorp") 会去 Hugging Face Hub 下载中文情感数据集，但服务器现在连不上 Hugging Face（要么是网络被墙，要么是没有设置访问 token）

</details>



解决办法

<details>
  <summary>解决方法</summary>

---

**方法 1：手动下载本地数据集（推荐，稳定）**

1. 我帮你找好 `ChnSentiCorp` 数据集的 CSV 文件（包含“评论”和“标签”），我们直接用 `pandas` 读本地数据，不走 Hugging Face Hub。
2. 你把文件放到 `/workspace/data/` 下，脚本改成：

```python
from datasets import Dataset
import pandas as pd

df = pd.read_csv("data/chnsenticorp.csv")  # 假设有 text, label 两列
dataset = Dataset.from_pandas(df)
```

这样完全不用联网。

---

**方法 2：配置 Hugging Face 国内镜像**（如果要继续用 Hub）

```bash
pip install huggingface_hub
huggingface-cli login  # 如果你有 HF 账号，输入 token
```

然后在 Python 里加：

```python
from datasets import load_dataset
dataset = load_dataset("shibing624/chnsenticorp")
```

`shibing624/chnsenticorp` 是社区上传的版本，比官方的更容易下载。
但前提是你的服务器能科学访问。

---

**方法 3：换一个本地可用的中文情感数据集**
比如直接用几百条示例数据练手，先跑通流程，再换更大的数据。

---

我走的是 **方法 1（本地数据）**，这样我们马上就能开始微调，不用折腾网络。

</details>





将以下数据写入`chnsenticorp.csv` 文件内容，然后把它保存到 `/workspace/data/chnsenticorp.csv` 就可以了。


<details>
  <summary>示例内容</summary>

这里是示例内容，包含几条中文情感分类的样本，格式是 `text,label`，label 1 表示积极，0 表示消极：

```csv
text,label
这个产品真的很好用,1
质量太差了，非常失望,0
服务态度非常好，值得推荐,1
不喜欢这个商品，体验很差,0
物美价廉，超出预期,1
垃圾，完全没有用,0
快递很快，包装也不错,1
差评，根本不值这个价格,0
用了几天才发现非常好用，满意,1
颜色和图片一样，非常漂亮,1
安装复杂，说明书不详细,0
客服态度冷淡，不想买了,0
性价比高，下次还会买,1
东西坏了，退货麻烦,0
物流慢得让人心焦,0
体验很好，操作简单,1
设计时尚，手感不错,1
没有预期的好，失望,0
包装破损，影响心情,0
价格合理，划算,1
产品材质很差，感觉便宜货,0
客服耐心解答，解决了问题,1
收到货后很满意，非常棒,1
快递员态度差，影响心情,0
质量非常好，超出预期,1
产品有异味，不建议购买,0
使用方便，效果明显,1
退货过程繁琐，浪费时间,0
非常喜欢，推荐购买,1
功能齐全，操作流畅,1

```

</details>

执行

✅ 训练完成，模型已保存到 ./my-chinese-sentiment




加载刚训练好的模型和分词器，给一句中文文本做情感预测：

<details>
  <summary>代码示例</summary>

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np

# 1. 加载训练后保存的模型和分词器
model_dir = "./my-chinese-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSequenceClassification.from_pretrained(model_dir)

# 2. 准备输入文本
text = "这个产品真的很好用，我很喜欢！"

# 3. 分词编码
inputs = tokenizer(text, return_tensors="pt", truncation=True, padding="max_length", max_length=128)

# 4. 模型推理
model.eval()
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits

# 5. 取概率最高的类别索引
predicted_class_id = torch.argmax(logits, dim=1).item()

# 6. 输出结果（0=消极，1=积极）
labels_map = {0: "消极", 1: "积极"}
print(f"文本：{text}")
print(f"预测情感：{labels_map[predicted_class_id]}")
```

---

把这段代码保存成比如 `predict.py`，执行：

```bash
python predict.py
```

就能看到模型对示例文本的情感预测结果了。

(base) root@VM-14-154-ubuntu:/workspace# python predict.py
文本：这个产品真的很好用，我很喜欢！
预测情感：积极
---


</details>



















### 微调方案

<details>
  <summary>方案</summary>
因为用的是 Hugging Face Transformers 训练的中文情感分类模型，想用类似 **LLaMA-Factory** 的带 Web UI 的工具来微调它，以下是可行方案和思路：

---

## 1. LLaMA-Factory UI 是专门针对 LLaMA 系列大语言模型设计的

* 它集成了训练、推理的 Web 界面
* 支持 LoRA / QLoRA 微调等
* 主要面向生成任务和大模型，不直接支持一般 Transformers 分类模型微调

---

## 2. 你的模型（基于 RoBERTa）微调 + UI 方案

### 方案 A：用 Gradio 或 Streamlit 自己搭建简单的 Web UI

* **Gradio** 是很流行的 Python 库，可以用几行代码快速做一个网页界面，既能推理也能触发训练
* 你可以把训练脚本改成函数，前端传入训练参数和数据，后台调用 Hugging Face Trainer 训练，推理部分用你已保存模型加载做预测

示例：简易推理 + 训练按钮界面（可扩展）

```python
import gradio as gr
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
import torch
import pandas as pd

model_dir = "./my-chinese-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSequenceClassification.from_pretrained(model_dir)

def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=-1)
    label = torch.argmax(probs).item()
    return "积极" if label == 1 else "消极"

def train(data_csv):
    # 这里简单示范：接收 CSV 文件路径，运行训练脚本或调用 Trainer
    df = pd.read_csv(data_csv.name)
    # 你可以写完整的训练流程，参考之前代码
    return "训练已完成！"

with gr.Blocks() as demo:
    gr.Markdown("# 中文情感分类微调与预测")
    text_input = gr.Textbox(label="输入文本预测情感")
    pred_button = gr.Button("预测")
    pred_output = gr.Label()
    
    pred_button.click(predict, inputs=text_input, outputs=pred_output)
    
    file_input = gr.File(label="上传训练数据 CSV")
    train_button = gr.Button("开始训练")
    train_output = gr.Textbox()
    
    train_button.click(train, inputs=file_input, outputs=train_output)

demo.launch()
```

用 `python your_gradio_app.py` 启动后就有个简单 UI 可以试。

---

### 方案 B：用已有的 Hugging Face Spaces

* Hugging Face Spaces 支持 Gradio/Streamlit，可以快速部署在线 Web 应用
* 但通常不支持在线训练，只适合推理

---

### 方案 C：使用专业 MLOps / AutoML 平台

* 比如 Azure ML Studio、Weights & Biases、SageMaker 等
* 有完整界面管理训练、推理和监控，但配置和成本较高

---

## 3. 总结

* **LLaMA-Factory 的 Web UI** 是专门给大语言模型用的，不能直接拿来训练 RoBERTa 分类模型
* 可以用 **Gradio** 自己快速搭个界面，实现简单的训练和推理交互
* 训练部分逻辑完全可复用已有的代码，UI 只负责文件上传和参数传递
---
</details>






## gradio-前端搭建

我采用方案A，以下是一个基于 **Gradio** 的简单中文情感分类微调+推理 Web UI 示例。这个界面支持：

* 输入文本做情感预测
* 上传新的训练数据 CSV，点击按钮触发微调训练

---

<details>
  <summary>示范</summary>

### 完整示范代码（`app.py`）

```python
import gradio as gr
import pandas as pd
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
import evaluate

# 初始加载已有模型和分词器
model_dir = "./my-chinese-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSequenceClassification.from_pretrained(model_dir)

# 评价指标
accuracy = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return accuracy.compute(predictions=predictions, references=labels)

# 预测函数
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    model.eval()
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)
        label = torch.argmax(probs).item()
    return "积极" if label == 1 else "消极"

# 训练函数
def train(file_obj):
    try:
        df = pd.read_csv(file_obj.name)
        if "text" not in df.columns or "label" not in df.columns:
            return "CSV必须包含'text'和'label'两列"
        
        dataset = Dataset.from_pandas(df)
        split_ds = dataset.train_test_split(test_size=0.2, seed=42)
        train_ds = split_ds["train"]
        eval_ds = split_ds["test"]

        def preprocess_fn(examples):
            return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=128)

        train_ds = train_ds.map(preprocess_fn, batched=True)
        eval_ds = eval_ds.map(preprocess_fn, batched=True)

        training_args = TrainingArguments(
            output_dir="./results",
            save_strategy="epoch",
            learning_rate=2e-5,
            per_device_train_batch_size=16,
            per_device_eval_batch_size=16,
            num_train_epochs=2,
            weight_decay=0.01,
            logging_dir="./logs",
            logging_steps=50,
            push_to_hub=False,
            load_best_model_at_end=False,
            fp16=True
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_ds,
            eval_dataset=eval_ds,
            tokenizer=tokenizer,
            compute_metrics=compute_metrics
        )

        trainer.train()

        # 训练结束后保存模型，方便后续预测用最新模型
        trainer.save_model(model_dir)
        tokenizer.save_pretrained(model_dir)

        return "✅ 训练完成，模型已更新"
    except Exception as e:
        return f"训练失败，错误：{e}"

# Gradio UI 布局
with gr.Blocks() as demo:
    gr.Markdown("# 中文情感分类微调与预测")
    
    with gr.Tab("预测"):
        text_input = gr.Textbox(label="输入文本")
        pred_button = gr.Button("预测情感")
        pred_output = gr.Label()
        pred_button.click(predict, inputs=text_input, outputs=pred_output)
    
    with gr.Tab("微调训练"):
        file_input = gr.File(label="上传训练数据 CSV（含 text, label 列）", file_types=[".csv"])
        train_button = gr.Button("开始微调训练")
        train_output = gr.Textbox()
        train_button.click(train, inputs=file_input, outputs=train_output)

demo.launch(server_name="0.0.0.0", server_port=7860)

```

---

### 使用说明

1. **准备好你之前训练好的模型**，路径是 `./my-chinese-sentiment`。
2. 安装依赖：

```bash
pip install gradio transformers datasets evaluate torch pandas
```

3. 运行：

```bash
python app.py
```

4. 浏览器打开自动弹出的链接或访问 `http://127.0.0.1:7860`，你就能看到界面。

5. **预测页**：输入中文文本点击“预测情感”。

6. **微调训练页**：上传包含 `text` 和 `label` 的 CSV 文件，点击“开始微调训练”，训练结束后模型会自动更新。

---

### 注意

* 训练会使用你的当前硬件（最好有 GPU）。
* 训练时间视数据量和机器性能而定。
* 训练过程的日志会输出到控制台。
* 这个界面示例简单直观，你可以根据需求自行扩展。

---
安装 sudo。
确保服务器本身没有额外防火墙限制
运行命令检查（Ubuntu 常见是 ufw）：


---

## Ubuntu/Debian 系统安装 ufw

```bash
apt update
apt install ufw
```

---


运行
```bash
ufw status
```

如果提示 `command not found`，`Status: inactive`说明系统没安装 `ufw`。


1. 用隧道工具（推荐）
通过隧道工具暴露 Gradio 端口，实现本地浏览器访问。

常用工具
ngrok（需注册）

cloudflared（Cloudflare 提供）

frp（需要你自己的公网服务器做跳板）

2. ngrok 简单使用示范
下载并安装 ngrok：

---

## 一、准备工作

1. 注册 [ngrok 官网](https://ngrok.com/) 并登录，进入 Dashboard 获取你的 **Authtoken**。

2. 云IDE 里下载并解压 ngrok：

```bash
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
chmod +x ngrok
./ngrok version
```



---

## 正确下载最新 ngrok 版本的方法

ngrok 最新版本是 3.x，官方最新 Linux 64位下载地址：

```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz -O ngrok.tgz
tar -xzf ngrok.tgz
chmod +x ngrok
./ngrok version
```





---

执行完后，认证 token ：

```bash
./ngrok authtoken <你的token>
```


## 公网访问与隧道工具-ngrok
---
### 执行

1. 先运行你的 Gradio 服务：

```bash
python app.py
```

确认它在运行，并且输出类似：

```
Running on local URL:  http://0.0.0.0:7860
```

2. 在另一个终端窗口，启动 ngrok 隧道：

```bash
./ngrok http 7860
```

3. 复制 ngrok 显示的公网地址，用浏览器访问，就能看到你的 Gradio 页面。

---。






## 总结与扩展

* 本文演示了中文情感分类模型的完整微调与部署流程
* 介绍了如何解决云服务器端口访问限制问题
* 后续可尝试 Docker 容器化部署、搭建更复杂的在线服务接口
* ngrok 免费账号的公网地址是临时随机的，重启后会变化。
* 建议只用于调试、临时访问。

---

## 项目文件结构

```
/workspace/
├── data/
│   └── chnsenticorp.csv       # 中文情感分类数据CSV
├── my-chinese-sentiment/      # 训练后模型文件夹
│   ├── config.json
│   ├── pytorch_model.bin
│   ├── tokenizer.json
│   └── ...
├── app.py                     # Gradio 启动脚本
├── finetune_sentiment.py      # 微调训练脚本
├── ngrok                      # ngrok 可执行文件
├── ngrok.tgz                  # ngrok 压缩包
└── start_gradio_with_ngrok.py # （可选）自动启动Gradio和ngrok脚本
```

---

