import os
import time
import re
import argparse

EXCLUDE_FILES = ['SUMMARY.md', 'README.md']
TIME_MARKER = '<!-- timestamp inserted -->'

def get_times(filepath):
    stat = os.stat(filepath)
    if hasattr(stat, 'st_birthtime'):  # macOS / BSD
        create_time = stat.st_birthtime
    else:
        create_time = stat.st_ctime  # Linux 下退化成 inode 变更时间
    modify_time = stat.st_mtime

    create_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(create_time))
    modify_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(modify_time))
    return create_time, modify_time

def make_time_block(create_time, modify_time):
    return f"""{TIME_MARKER}
> 📄 创建时间：{create_time}  
> 🛠️ 修改时间：{modify_time}

"""

def insert_or_update_time(filepath, force=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    create_time, modify_time = get_times(filepath)

    if TIME_MARKER in content:
        if force:
            # 强制刷新 创建+修改
            new_block = make_time_block(create_time, modify_time)
            # 整个时间块替换
            new_content = re.sub(
                rf"{TIME_MARKER}[\s\S]*?\n\n",
                new_block,
                content,
                count=1
            )
        else:
            # 仅刷新 修改时间
            new_content = re.sub(
                r"(> 🛠️ 修改时间：)(.*)",
                f"\\1{modify_time}",
                content
            )
    else:
        # 第一次 → 插入完整 block
        new_content = make_time_block(create_time, modify_time) + content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def run(force=False):
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.md') and file not in EXCLUDE_FILES:
                insert_or_update_time(os.path.join(root, file), force=force)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="插入或更新 Markdown 文件的时间戳")
    parser.add_argument("--force", action="store_true", help="强制刷新创建时间和修改时间")
    args = parser.parse_args()

    run(force=args.force)
