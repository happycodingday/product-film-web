# Product Film Web · 产品宣传视频 Skill

[English](README.md) | **简体中文**

**超简单的产品宣传视频 skill。** 无需剪辑经验，也能制作发布会级产品宣传片。描述你的产品，AI 自动设计故事与动画，搭建网页工作站供你播放、交互和录屏，完成宣传视频。

<video src="https://github.com/user-attachments/assets/c0856b06-a438-4490-9b31-4c6911426fb5" width="560" controls preload="metadata"></video>

**示例说明：视频中的产品、品牌、功能、界面及使用场景均为虚构模拟，仅用于展示宣传片效果，不代表真实产品或经过验证的性能。**

## 它能做什么

提供产品介绍与已有素材，AI 会自主设计故事、分镜、动画和节奏，通过可本地运行的网页工作站呈现。你可以播放、交互并录制画面，制作产品宣传视频。

- 发布会风格：黑色舞台、渐变大字、立体层次与金属展示框。
- 针对不同对象创作内容，适用于硬件、软件、服务、课程、品牌及想法。
- 支持自动播放、暂停、进度定位、章节跳转、倍速、纯净模式和全屏。
- 按需加入可点击的演示、真实软件界面，以及与播放同步的配乐。
- 提供无依赖模板，使用 Node.js 本地运行，无需 npm 安装。

内置发布会风格的视觉模板，**故事、场景和动画根据具体产品自主设计**。技能说明使用英文，最终影片可以按要求使用中文或其他语言。

## 使用技能

克隆仓库后，将 `product-film-web-skill/` 安装到 Agent 配置的技能目录，或使用 Agent 支持的本地技能导入方式：

```sh
git clone https://github.com/happycodingday/product-film-web.git
```

技能及全部配套资源位于 `product-film-web-skill/`，调用名为 `$product-film-web`。如需通过文件夹名识别技能，安装时将该文件夹命名为 `product-film-web`。调用示例：

```text
使用 $product-film-web，为我的 AI 眼镜制作一支约 60 秒的产品发布宣传片。
采用精致的发布会风格，根据这个产品自主设计故事、场景和动画。
支持自动播放、暂停、章节跳转与纯净录屏模式，演出文案使用中文。
产品资料和素材如下：……
```

一句产品描述即可开始；补充图片、品牌素材、官网、可运行的软件、受众和目标时长，可以让影片更贴合需求。希望 AI 连产品本身也一起设计时，请说明是虚构概念产品。

## 手动创建起始项目

初始化脚本需要 Python 3.9+，本地服务需要 Node.js；通过 Agent 生成影片还需要支持技能的 Agent。

```sh
python product-film-web-skill/scripts/init_film.py my-product-film --brand "我的产品"
cd my-product-film
node serve.cjs 4178
```

打开 `http://localhost:4178/`。模板是可运行的视觉壳层，需要根据产品重写 `config.js`、分镜视图和动画模块，示例章节可以自由增删。不要直接双击 HTML 文件运行。

## 播放与录屏

| 操作 | 功能 |
| --- | --- |
| Space | 播放 / 暂停 |
| R | 从头重播 |
| 左 / 右方向键 | 切换章节 |
| H | 隐藏 / 显示控制栏 |
| F | 进入 / 退出全屏 |
| 进度条 | 定位到任意时间 |

使用自己的录屏工具录制浏览器画面；加入配乐时选择系统声音。**纯净模式只隐藏控件，不会自动开始录屏。** 交付内容是 HTML 项目，不是自动导出的 MP4。

## 仓库结构

```text
product-film-web/
├── product-film-web-skill/    # 技能的完整独立目录
│   ├── SKILL.md               # 英文技能说明
│   ├── agents/openai.yaml     # 技能展示信息
│   ├── scripts/init_film.py   # 项目初始化脚本
│   ├── references/           # 动画、视觉、演示与录屏指南
│   └── assets/film-starter/   # 默认模板与播放器
├── README.md                  # 英文说明与示例视频
├── README.zh-CN.md             # 中文说明与示例视频
└── LICENSE
```

示例通过上方视频展示，仓库不附带示例工程或视频文件。

## 许可

代码使用 [MIT 许可证](LICENSE)。制作影片时，请使用有相应授权的图片、视频和音乐。模板不附带第三方配乐。
