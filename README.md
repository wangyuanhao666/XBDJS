# 下班倒计时 🥳

一个充满乐趣、交互式的下班倒计时网页。它不仅能实时显示距离下班的剩余时间，还在倒计时结束后为你送上庆祝动画和音效，让每天的辛勤工作都有一个愉快的收尾！

---

## ✨ 主要功能

*   **实时倒计时**：精确到秒，实时显示距离下班的剩余时间。
*   **可自定义下班时间**：轻松设置你的目标下班时间。
*   **可视化进度条**：在倒计时下方有一条彩色进度条，直观展示时间流逝。
*   **下班庆祝**：倒计时结束后，自动播放庆祝音效，并弹出持续10秒的"下班啦"动态庆祝动画。
*   **下班历史记录**：自动记录每次下班的日期和时间，并存储在浏览器本地。
*   **节假日彩蛋**：在元旦、国庆等节假日，自动弹出特别的祝福弹窗。
*   **日期与星期显示**：在页面顶部显示今日日期和星期，方便查阅。
*   **响应式设计**：在桌面和手机端都有良好的视觉体验。
*   **便捷控制**：下班弹窗中提供"重置倒计时"和"关闭声音"按钮。

---

## 🚀 如何使用

本项目无需复杂安装，但为确保音效等本地资源正常加载，**强烈建议使用本地服务器运行**。

#### 推荐方式：使用 VS Code 的 Live Server 插件
1.  用 VS Code 打开项目文件夹。
2.  在 `index.html` 文件上右键，选择 `Open with Live Server`。
3.  浏览器将自动打开 `http://127.0.0.1:5500/index.html` 或类似地址。

#### 备选方式：使用 Python 启动服务器
如果你的电脑安装了 Python，可以在项目文件夹下运行：
```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```
然后浏览器访问 `http://localhost:8000/`。

---

## 🛠️ 文件结构

```
.
├── index.html      # 页面结构
├── style.css       # 页面样式与动画
├── script.js       # 核心逻辑与交互
├── tada.mp3        # 下班庆祝音效
└── README.md       # 项目说明
```

---

## 🎨 自定义

你可以轻松地对项目进行个性化设置。

*   **修改默认下班时间**：  
    打开 `index.html`，修改 `<input>` 标签的 `value` 值。
    ```html
    <input type="time" id="off-work-time" value="18:00">
    ```

*   **添加更多节假日彩蛋**：  
    打开 `script.js`，在 `holidays` 数组中添加新的节假日对象。
    ```javascript
    const holidays = [
        // ... 已有节日
        { month: 9, day: 10, emoji: '👨‍🏫', text: '教师节快乐！' },
    ];
    ```

*   **更换庆祝音效**：  
    将你的音效文件（如 `new_sound.mp3`）放入项目文件夹，并修改 `index.html` 中的 `<audio>` 标签。
    ```html
    <audio id="tada-sound" src="new_sound.mp3"></audio>
    ```

---

## 💻 技术栈

*   **HTML**
*   **CSS** (Flexbox, Grid, Animations)
*   **JavaScript** (ES6+, Fetch API)

---

## 📄 许可

本项目采用 [MIT](https://opensource.org/licenses/MIT) 许可。 
