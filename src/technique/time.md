

## ✅ 改进目标

1. **将时间信息插入到文首**（而不是结尾）
2. **格式更优雅，使用 `::: info` 块或者引用块，美观统一**
3. **防止重复插入**
4. **自动跳过 `SUMMARY.md` 等特殊文件**

---

## 🧩 优化后的脚本 `insert_timestamp.py`

请将你原来的脚本内容全部替换为以下内容：

```python
import os
import time

EXCLUDE_FILES = ['SUMMARY.md', 'README.md']
TIME_MARKER = '<!-- timestamp inserted -->'

def get_times(filepath):
    stat = os.stat(filepath)
    create_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(stat.st_ctime))
    modify_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(stat.st_mtime))
    return create_time, modify_time

def insert_time_block(content, create_time, modify_time):
    block = f"""{TIME_MARKER}
> 📄 创建时间：{create_time}  
P25-08-05 04:18:44

"""
    return block + content

def insert_time_info(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if TIME_MARKER in content:
        return  # 已插入，跳过

    create_time, modify_time = get_times(filepath)
    new_content = insert_time_block(content, create_time, modify_time)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def run():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.md') and file not in EXCLUDE_FILES:
                insert_time_info(os.path.join(root, file))

if __name__ == '__main__':
    run()
```

---

## 📌 效果预览

运行后，你的每篇 Markdown 会变成这样：

```markdown
<!-- timestamp inserted -->
> 📄 创建时间：2025-07-31 02:45:12  
P25-08-05 04:18:44

# 第一章：序言

……
```

---

## 🧪 现在你可以：

1. 把上面脚本复制保存为 `insert_timestamp.py`
2. 打开终端，切换到你的 mdBook 项目目录
3. 执行命令：

```bash
python insert_timestamp.py
```

再打开一篇 `.md` 文件看看是否时间插入成功了 ✅


