<!-- timestamp inserted -->
> 📄 创建时间：2025-07-29 15:37:59  
> 🛠️ 修改时间：2025-07-29 15:37:59



### **Git教程：创建SSH密钥并连接到GitHub**

在这篇博文中，我们将学习如何生成SSH密钥，并将其添加到你的GitHub帐户，以便你可以安全地连接和管理你的远程仓库。
[Github官方教程](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

#### **第一步：创建SSH密钥**

首先，我们需要在你的本地计算机上创建一个SSH密钥。打开你的终端或Git Bash，然后输入以下命令：

```bash
ssh-keygen -t ed25519 -C "1007840220@qq.com"
"
```
  * `-C "your_email@example.com"`：提供一个注释，通常是你的电子邮件地址，以便于识别。

执行此命令后，系统会提示你输入文件的保存位置和密码。你可以直接按Enter键接受默认位置，并选择是否设置密码。如果你设置了密码，每次使用SSH密钥时都需要输入该密码。

#### **第二步：将SSH公钥添加到GitHub**

位置默认: C:\Users\当前用户（例如：lenovo）\.ssh

创建密钥后，你需要将公钥（`.pub`文件）的内容添加到你的GitHub帐户中。

1.  **复制公钥内容**：
    在你的终端中，使用`cat`命令来显示并复制公钥的内容：

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

2.  **在GitHub上添加公钥**：

      * 登录到你的GitHub帐户。
      * 点击右上角的个人头像，然后选择**Settings**。
      * 在左侧菜单中，选择**SSH and GPG keys**。
      * 点击**New SSH key**按钮。
      * 在**Title**字段中，为你的密钥起一个容易识别的名称（例如，“My Laptop”）。
      * 将你复制的公钥内容粘贴到**Key**字段中。
      * 点击**Add SSH key**。

#### **第三步：测试连接**

现在，你可以通过在终端中运行以下命令来测试你与GitHub的SSH连接：

```bash
ssh -T git@github.com
```

如果你看到一条包含你用户名的欢迎消息，那么恭喜你，你已经成功地设置了SSH密钥并连接到了GitHub！

-----

### 配置 Git 远程地址为 SSH

```bash
git remote set-url origin git@github.com:用户名/仓库名.git
```

