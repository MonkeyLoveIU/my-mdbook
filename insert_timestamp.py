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
> 🛠️ 修改时间：{modify_time}

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
