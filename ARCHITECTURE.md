# 项目架构与实现机制说明

## 1. 项目概述

这是一个基于 **Jekyll** 的静态网站生成器项目，使用 **Academic Pages** 主题（基于 Minimal Mistakes），部署在 GitHub Pages 上。

### 核心技术栈
- **Jekyll**: 静态网站生成器
- **Liquid**: 模板语言
- **SCSS/SASS**: 样式预处理器
- **Susy**: CSS 网格系统
- **jQuery**: JavaScript 库（用于交互功能）

---

## 2. 目录结构说明

```
daiziyan.github.io/
├── _config.yml              # Jekyll 配置文件（站点设置、插件、集合等）
├── _layouts/                # 页面布局模板
│   ├── default.html         # 默认布局（所有页面的基础）
│   ├── single.html          # 单页/文章布局
│   └── compress.html        # HTML 压缩布局
├── _includes/               # 可复用的组件片段
│   ├── masthead.html        # 顶部导航栏
│   ├── sidebar.html         # 侧边栏
│   ├── language-switcher.html  # 语言切换器（HTML部分）
│   ├── author-profile.html  # 作者信息卡片
│   └── scripts.html         # JavaScript 脚本加载
├── _pages/                  # 页面内容
│   ├── en/                  # 英文页面
│   └── zh/                  # 中文页面
├── _posts/                  # 博客文章
│   ├── en/                  # 英文文章
│   └── zh/                  # 中文文章
├── _sass/                   # SCSS 样式文件
│   ├── layout/              # 布局相关样式
│   │   ├── _sidebar.scss    # 侧边栏样式
│   │   ├── _masthead.scss   # 导航栏样式
│   │   └── _page.scss       # 页面样式
│   ├── custom/              # 自定义样式
│   │   └── _custom.scss     # **主要自定义样式文件**
│   └── vendor/              # 第三方库样式
├── _data/                   # 数据文件（YAML格式）
│   ├── navigation.yml       # 英文导航菜单
│   ├── navigation-zh.yml    # 中文导航菜单
│   └── ui-text.yml          # UI 文本翻译
├── assets/                  # 静态资源
│   ├── css/                 # 编译后的 CSS
│   ├── js/                  # JavaScript 文件
│   │   └── language-switcher.js  # 语言切换逻辑
│   └── fonts/               # 字体文件
└── images/                  # 图片资源
```

---

## 3. 核心实现机制

### 3.1 页面渲染流程

```
页面内容（Markdown/HTML）
    ↓
Front Matter（YAML 前置元数据）
    ↓
选择 Layout（如 single.html）
    ↓
Layout 包含 Includes（如 masthead.html, sidebar.html）
    ↓
应用样式（SCSS → CSS）
    ↓
HTML 压缩（compress layout）
    ↓
最终 HTML 输出
```

**示例：** 一个博客文章的渲染过程

1. `_posts/en/2025-01-01-post.md` 被 Jekyll 读取
2. Front Matter 指定 `layout: single`
3. `_layouts/single.html` 被应用
4. `single.html` 包含 `{% include sidebar.html %}`
5. `sidebar.html` 包含 `{% include author-profile.html %}`
6. 所有样式从 `_sass/` 编译并应用
7. 最终生成静态 HTML

### 3.2 多语言实现机制

#### 路径分离策略
- **英文内容**: `/en/` 路径下
- **中文内容**: `/zh/` 路径下
- **根路径**: 重定向到 `/en/`

#### 导航菜单切换
```liquid
<!-- _includes/masthead.html -->
{% if current_path contains '/zh/' %}
  {% assign nav_data = site.data.navigation-zh.main %}
{% else %}
  {% assign nav_data = site.data.navigation.main %}
{% endif %}
```

#### 语言切换器
- **HTML**: `_includes/language-switcher.html` - 按钮 UI
- **JavaScript**: `assets/js/language-switcher.js` - 切换逻辑
- **功能**:
  1. 检测当前 URL 路径确定语言
  2. 点击按钮时计算目标语言 URL
  3. 使用 `localStorage` 保存用户偏好
  4. 动态更新导航链接和页面文本

### 3.3 样式系统架构

#### SCSS 编译流程
```
_sass/custom/_custom.scss  (你的自定义样式)
    ↓
assets/css/main.scss        (主样式入口)
    ↓
Jekyll SCSS 编译
    ↓
assets/css/main.css         (最终 CSS)
```

#### 样式优先级
1. **基础样式**: `_sass/layout/` 中的文件
2. **主题样式**: `_sass/theme/_default.scss`
3. **自定义样式**: `_sass/custom/_custom.scss` (最后加载，优先级最高)

#### 响应式设计
使用 **Susy** 网格系统和 **Breakpoint** mixin：

```scss
@include breakpoint($large) {
  // 大屏幕样式
}

@media screen and (max-width: 1023px) {
  // 小屏幕样式
}
```

### 3.4 布局系统

#### 布局层次
```
default.html (最外层)
  ├── head.html (头部)
  ├── masthead.html (导航栏)
  ├── content (页面内容)
  │   └── single.html (单页布局)
  │       ├── sidebar.html (侧边栏)
  │       └── page content (正文)
  ├── footer.html (页脚)
  └── scripts.html (脚本)
```

#### 关键布局文件

**`_layouts/default.html`**
- 所有页面的基础模板
- 包含 HTML 结构、head、body
- 使用 `compress` layout 压缩 HTML

**`_layouts/single.html`**
- 单页/文章页面布局
- 包含侧边栏、文章内容、元数据
- 支持作者信息、分类标签等

---

## 4. 如何优化页面布局

### 4.1 修改样式（推荐方式）

**主要文件**: `_sass/custom/_custom.scss`

这是你的自定义样式文件，所有样式修改应该在这里进行。

#### 示例：修改侧边栏样式

```scss
// _sass/custom/_custom.scss

/* 修改作者头像 */
.author__avatar img {
  max-width: 200px !important;  // 增大头像
  border-radius: 50% !important;
}

/* 修改作者信息卡片 */
.author__content {
  padding: 2em 0 !important;  // 增加内边距
  text-align: center !important;
}

/* 响应式调整 */
@media screen and (max-width: 1023px) {
  .author__content {
    padding: 1em 0 !important;  // 小屏幕减少内边距
  }
}
```

#### 样式优先级技巧
- 使用 `!important` 覆盖主题默认样式
- 使用更具体的选择器提高优先级
- 在 `_custom.scss` 中的样式会最后加载，自然优先级高

### 4.2 修改 HTML 结构

#### 修改组件（Includes）

**示例：修改导航栏**
- 文件: `_includes/masthead.html`
- 可以添加/删除导航项
- 修改语言切换器位置

**示例：修改侧边栏**
- 文件: `_includes/sidebar.html`
- 文件: `_includes/author-profile.html`
- 可以调整作者信息显示顺序

#### 修改布局模板

**示例：修改单页布局**
- 文件: `_layouts/single.html`
- 可以调整侧边栏和主内容的位置
- 可以添加/删除页面元素

### 4.3 响应式布局调整

#### 使用媒体查询

```scss
// 小屏幕（移动端）
@media screen and (max-width: 1023px) {
  .sidebar {
    display: none !important;  // 隐藏侧边栏
  }

  .page__content {
    width: 100% !important;  // 内容全宽
  }
}

// 大屏幕（桌面端）
@include breakpoint($large) {
  .sidebar {
    display: block !important;
    width: 25% !important;
  }

  .page__content {
    width: 75% !important;
  }
}
```

#### 使用 Susy 网格系统

```scss
.page__content {
  @include span(9 of 12);  // 占用 9/12 宽度
}

.sidebar {
  @include span(3 of 12 last);  // 占用 3/12 宽度，最后一项
}
```

### 4.4 常见布局优化场景

#### 场景 1: 调整侧边栏位置

```scss
// _sass/custom/_custom.scss

.sidebar {
  @include breakpoint($large) {
    float: right !important;  // 改为右侧
    margin-left: 2em !important;
  }
}
```

#### 场景 2: 修改导航栏样式

```scss
// _sass/custom/_custom.scss

.masthead {
  background: #f5f5f5 !important;
  border-bottom: 2px solid #333 !important;
}

.masthead__menu-item a {
  color: #333 !important;
  font-weight: 600 !important;

  &:hover {
    color: #007acc !important;
  }
}
```

#### 场景 3: 调整页面内容宽度

```scss
// _sass/custom/_custom.scss

.page {
  max-width: 1200px !important;  // 限制最大宽度
  margin: 0 auto !important;     // 居中
}

.page__content {
  padding: 2em !important;  // 增加内边距
}
```

### 4.5 调试技巧

#### 1. 本地开发服务器
```bash
bundle exec jekyll serve
# 访问 http://localhost:4000
```

#### 2. 查看编译后的 CSS
- 检查 `_site/assets/css/main.css`
- 确认你的样式是否被正确编译

#### 3. 浏览器开发者工具
- 使用 Chrome DevTools 检查元素
- 查看应用的样式规则
- 测试响应式布局

#### 4. 清除缓存
```bash
# 删除 _site 目录重新生成
rm -rf _site
bundle exec jekyll build
```

---

## 5. 关键配置文件

### 5.1 `_config.yml`
- **站点基本信息**: title, description, url
- **作者信息**: author 部分
- **插件配置**: plugins 列表
- **集合定义**: collections（posts, technical-writing 等）
- **默认值**: defaults（为不同路径设置默认 layout）

### 5.2 `_data/navigation.yml` 和 `navigation-zh.yml`
- 定义导航菜单项
- 控制菜单顺序和链接

### 5.3 `assets/css/main.scss`
- SCSS 文件导入顺序
- 最后导入 `custom/custom`，确保自定义样式优先级最高

---

## 6. 最佳实践

### 6.1 样式修改
✅ **推荐**: 在 `_sass/custom/_custom.scss` 中添加样式
❌ **不推荐**: 直接修改主题原始文件（更新时会丢失）

### 6.2 组件修改
✅ **推荐**: 复制 `_includes/` 中的文件并修改
❌ **不推荐**: 直接修改主题 includes（除非确定不会更新主题）

### 6.3 响应式设计
✅ **推荐**: 使用 `@include breakpoint($large)` 或标准媒体查询
✅ **推荐**: 移动优先设计（先写移动端样式，再写桌面端）

### 6.4 性能优化
- 使用 `compress` layout 压缩 HTML
- 图片优化（使用 WebP 格式）
- 最小化 JavaScript（语言切换器已优化）

---

## 7. 快速参考

### 修改导航栏
- 文件: `_data/navigation.yml` 或 `navigation-zh.yml`
- 文件: `_includes/masthead.html`

### 修改侧边栏
- 文件: `_includes/sidebar.html`
- 文件: `_includes/author-profile.html`
- 样式: `_sass/custom/_custom.scss` (搜索 `.author__` 或 `.sidebar`)

### 修改页面布局
- 文件: `_layouts/single.html`
- 样式: `_sass/custom/_custom.scss` (搜索 `.page__`)

### 修改语言切换
- HTML: `_includes/language-switcher.html`
- JavaScript: `assets/js/language-switcher.js`

### 添加新页面
1. 在 `_pages/en/` 或 `_pages/zh/` 创建 Markdown 文件
2. 设置 Front Matter（layout, permalink 等）
3. 如需添加到导航，编辑 `_data/navigation.yml`

---

## 8. 常见问题

### Q: 为什么我的样式不生效？
A:
1. 检查是否使用了 `!important`
2. 确认选择器优先级
3. 清除 `_site` 目录重新编译
4. 检查浏览器缓存

### Q: 如何添加新的页面类型？
A:
1. 创建新的 layout 文件（如 `_layouts/custom.html`）
2. 在页面 Front Matter 中指定 `layout: custom`
3. 如需样式，在 `_custom.scss` 中添加

### Q: 如何修改主题颜色？
A:
- 查看 `_sass/theme/_default.scss` 中的 CSS 变量
- 在 `_custom.scss` 中覆盖这些变量

---

## 总结

这个项目使用 **Jekyll + Academic Pages 主题**，通过以下方式实现：

1. **内容组织**: 使用 Collections 和 Posts 分离中英文内容
2. **布局系统**: Layouts + Includes 实现模块化
3. **样式系统**: SCSS + Susy 网格实现响应式设计
4. **多语言**: 路径分离 + JavaScript 动态切换

**优化布局的核心文件**:
- `_sass/custom/_custom.scss` - 所有样式修改
- `_includes/` - HTML 组件修改
- `_layouts/` - 页面布局修改

记住：**始终在 `_custom.scss` 中修改样式，不要直接修改主题文件！**

