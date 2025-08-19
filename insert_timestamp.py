#!/usr/bin/env python3
import os
import re
import subprocess
from datetime import datetime

EXCLUDE_FILES = ['SUMMARY.md', 'README.md']

def get_git_times(filepath):
    """获取 Git 文件的创建时间和最后修改时间"""
    try:
        create_time = subprocess.check_output(
            ["git", "log", "--diff-filter=A", "--format=%aI", "--", filepath],
            text=True
        ).strip().split("\n")[-1]
    except subprocess.CalledProcessError:
        create_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        modify_time = subprocess.check_output(
            ["git", "log", "-1", "--format=%aI", "--", filepath],
            text=True
        ).strip()
    except subprocess.CalledProcessError:
        modify_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 转换为友好格式：YYYY-MM-DD HH:MM:SS
    def pretty(time_str):
        try:
            dt = datetime.fromisoformat(time_str.replace("Z", "+00:00"))
            return dt.strftime("%Y-%m-%d %H:%M:%S")
        except ValueError:
            return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return pretty(create_time), pretty(modify_time)

def insert_or_update_file(filepath, force=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    created_pattern = re.compile(r"^📄 创建时间：(.+)$", re.MULTILINE)
    modified_pattern = re.compile(r"^🛠️ 修改时间：(.+)$", re.MULTILINE)

    create_time, modify_time = get_git_times(filepath)

    created_match = created_pattern.search(content)
    modified_match = modified_pattern.search(content)

    if not created_match or force:
        created_line = f"📄 创建时间：{create_time}"
    else:
        created_line = created_match.group(0)

    modified_line = f"🛠️ 修改时间：{modify_time}"

    if created_match and modified_match:
        content = created_pattern.sub(created_line, content, 1)
        content = modified_pattern.sub(modified_line, content, 1)
    else:
        content = created_line + "\n" + modified_line + "\n\n" + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def process_directory(root_dir="."):
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md") and file not in EXCLUDE_FILES:
                insert_or_update_file(os.path.join(root, file))

if __name__ == "__main__":
    process_directory()
