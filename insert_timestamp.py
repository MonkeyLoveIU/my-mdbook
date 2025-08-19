#!/usr/bin/env python3
import os
import re
from datetime import datetime

# ---------- 配置 ----------
EXCLUDE_FILES = ['SUMMARY.md', 'README.md']
TIME_MARKER = '<!-- timestamp inserted -->'

# ---------- 时间格式 ----------
def get_now_str():
    # 使用友好格式：2025-08-20 03:53:12
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# ---------- 文件处理 ----------
def insert_or_update_file(filepath, force=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    created_pattern = re.compile(r"^📄 创建时间：(.+)$", re.MULTILINE)
    modified_pattern = re.compile(r"^🛠️ 修改时间：(.+)$", re.MULTILINE)

    now_str = get_now_str()

    created_match = created_pattern.search(content)
    modified_match = modified_pattern.search(content)

    if not created_match or force:
        # 插入或强制更新创建时间
        created_line = f"📄 创建时间：{now_str}"
    else:
        created_line = created_match.group(0)

    # 始终更新修改时间
    modified_line = f"🛠️ 修改时间：{now_str}"

    if created_match and modified_match:
        # 替换原有行
        content = created_pattern.sub(created_line, content, 1)
        content = modified_pattern.sub(modified_line, content, 1)
    else:
        # 插入到文件开头
        content = created_line + "\n" + modified_line + "\n\n" + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# ---------- 遍历目录 ----------
def process_directory(root_dir="."):
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md") and file not in EXCLUDE_FILES:
                insert_or_update_file(os.path.join(root, file))

if __name__ == "__main__":
    process_directory()
