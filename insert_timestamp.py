import os
import subprocess
import re
import argparse
from datetime import datetime

EXCLUDE_FILES = ['SUMMARY.md', 'README.md']
TIME_MARKER = '<!-- timestamp inserted -->'
TIME_FORMAT = "%Y-%m-%d %H:%M:%S"  # 统一时间显示格式

def format_git_time(git_time):
    """格式化 Git ISO 时间为自定义格式"""
    dt = datetime.fromisoformat(git_time)
    return dt.strftime(TIME_FORMAT)

def get_git_times(filepath):
    """通过 git log 获取文件的创建时间和最后修改时间"""
    try:
        create_time = subprocess.check_output(
            ["git", "log", "--diff-filter=A", "--format=%aI", "--", filepath],
            text=True
        ).strip().split("\n")[-1]
        create_time = format_git_time(create_time)
    except subprocess.CalledProcessError:
        create_time = "未知"

    try:
        modify_time = subprocess.check_output(
            ["git", "log", "-1", "--format=%aI", "--", filepath],
            text=True
        ).strip()
        modify_time = format_git_time(modify_time)
    except subprocess.CalledProcessError:
        modify_time = "未知"

    return create_time, modify_time

def make_time_block(create_time, modify_time):
    return f"""{TIME_MARKER}
> 📄 创建时间：{create_time}  
> 🛠️ 修改时间：{modify_time}

"""

def insert_or_update_time(filepath, force=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    create_time, modify_time = get_git_times(filepath)

    if TIME_MARKER in content:
        if force:
            # 强制刷新（创建+修改）
            new_block = make_time_block(create_time, modify_time)
            new_content = re.sub(
                rf"{TIME_MARKER}[\s\S]*?\n\n",
                new_block,
                content,
                count=1
            )
        else:
            # 只更新修改时间
            new_content = re.sub(
                r"(> 🛠️ 修改时间：)(.*)",
                f"\\1{modify_time}",
                content
            )
    else:
        # 没有时间戳 → 插入新 block
        new_content = make_time_block(create_time, modify_time) + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

def run(force=False):
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".md") and file not in EXCLUDE_FILES:
                insert_or_update_time(os.path.join(root, file), force=force)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="在 Markdown 文件开头插入/更新 Git 提交时间戳")
    parser.add_argument("--force", action="store_true", help="强制刷新创建时间和修改时间")
    args = parser.parse_args()

    run(force=args.force)
