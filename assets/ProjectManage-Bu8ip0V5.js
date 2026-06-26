import{E as e,d as t,f as n,k as r,l as i,p as a,t as o,y as s}from"./index-BCdskQEQ.js";var c=`/ZWU-2026-2-004/assets/image1-BhJxJUlX.png`,l=`/ZWU-2026-2-004/assets/image2-D9jE7AQl.png`,u=`/ZWU-2026-2-004/assets/image3-BBV4wi41.png`,d={class:`project-manage`},f={class:`doc section`},p={class:`container doc__container`},m={class:`doc-block`},h={class:`doc-figure`},g=[`src`],_={class:`doc-block`},v={class:`qa`},y={class:`doc-figure`},b=[`src`],x={class:`qa`},S={class:`doc-figure`},C=[`src`],w=`mangrxiaoxi/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── NavBar.vue          # 顶部导航栏
│   │   └── FooterSection.vue   # 底部组件
│   ├── router/
│   │   └── index.js            # 路由配置
│   ├── views/
│   │   ├── Home.vue            # 首页
│   │   ├── DeviceManagement.vue # 设备管理页面
│   │   ├── Features.vue        # 功能特点页面
│   │   └── About.vue           # 关于我们页面
│   ├── App.vue                 # 主应用组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式
├── index.html
├── package.json
├── vite.config.js
└── README.md`,T=`# 1. 安装依赖
cd mangrxiaoxi
npm install

# 2. 运行开发服务器（http://localhost:5173）
npm run dev

# 3. 构建生产版本
npm run build`,E=`import { createRouter, createWebHashHistory } from 'vue-router'
// 导入两个页面组件
import Home from '../views/Home.vue'
import DeviceManage from '../views/DeviceManage.vue'
// 路由表：绑定页面路径与组件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 超链接跳转目标地址
    path: '/device-manage',
    name: 'DeviceManage',
    component: DeviceManage
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router`,D=`<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <el-header height="70px" style="background:#409EFF">
      <div class="nav-box">
        <h2 style="color:white;margin:0">HearLink听障辅助设备管理系统</h2>
        <div class="nav-link">
          <!-- Vue路由超链接：点击跳转页面 -->
          <router-link to="/" class="link">首页</router-link>
          <router-link to="/device-manage" class="link">设备管理</router-link>
        </div>
      </div>
    </el-header>
    <!-- 页面渲染出口，跳转后页面在此显示 -->
    <router-view />
  </div>
</template>
<script setup>
// 无需额外逻辑，router-view自动渲染对应页面
<\/script>
<style scoped>
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 40px;
}
.link {
  color: white;
  font-size: 18px;
  margin-left: 30px;
  text-decoration: none;
}
</style>`,O=`<template>
  <div class="device-page" style="padding:30px">
    <h1>设备管理页面</h1>
    <p>实时管理所有HearLink智能提醒设备，查看运行状态与历史记录</p>
    <!-- 设备卡片区域：v-for动态渲染全部设备 -->
    <div class="card-wrap" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin:30px 0">
      <!-- 循环读取deviceList数据源，自动生成卡片 -->
      <el-card
        v-for="item in deviceList"
        :key="item.id"
        :class="{lowPower: item.power < 20}"
      >
        <h3>设备编号：{{ item.id }}</h3>
        <p>连接状态：{{ item.online ? "在线" : "离线" }}</p>
        <p>剩余电量：{{ item.power }}%</p>
        <p>默认震动模式：{{ item.vibeMode }}</p>
        <p>提示灯光：{{ item.lightColor }}</p>
      </el-card>
    </div>
    <!-- 设备历史提醒表格 -->
    <h2>声音触发历史记录</h2>
    <el-table :data="recordList" border>
      <el-table-column label="设备ID" prop="deviceId"></el-table-column>
      <el-table-column label="触发声源" prop="soundType"></el-table-column>
      <el-table-column label="触发时间" prop="time"></el-table-column>
      <el-table-column label="震动档位" prop="vibe"></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
// 1. 模拟设备数据源（AI提供的测试数据）
const deviceList = ref([
  {id:"HL001", online:true, power:78, vibeMode:"持续震动", lightColor:"蓝色"},
  {id:"HL002", online:true, power:15, vibeMode:"间歇震动", lightColor:"红色"},
  {id:"HL003", online:false, power:42, vibeMode:"长震短停", lightColor:"黄色"},
])
// 2. 历史记录数据源
const recordList = ref([
  {deviceId:"HL001", soundType:"门铃声", time:"2026-06-24 08:22", vibe:"3档"},
  {deviceId:"HL002", soundType:"火警警报", time:"2026-06-24 14:10", vibe:"5档"},
])
// 3. 页面渲染核心逻辑：onMounted 页面加载完成自动读取数据
onMounted(()=>{
  console.log("设备管理页面加载完成，自动渲染设备列表")
  // 实际项目可在这里请求后端接口获取真实设备数据
})
<\/script>
<style scoped>
/* 低电量设备标红样式 */
.lowPower {
  border: 2px solid #f56c6c;
  background: #fef0f0;
}
</style>`,k=`<template>
  <div class="home" style="padding:40px">
    <h1>HearLink 听障智能声光震动提醒设备</h1>
    <img src="@/assets/hearlink/main.png" width="600"/>
    <p>三重提醒：震动+LED灯光+OLED文字，识别门铃、来电、火警环境音，帮助听障人群捕捉生活声音。</p>
    <p>点击顶部导航【设备管理】查看全部设备运行数据</p>
  </div>
</template>`,A=`ZWU-2026-2-004
├─ index.html      # 网页入口文件
├─ App.vue         # 全局根页面
├─ package.json    # 项目依赖配置
├─ assets          # 产品图片、素材文件夹
├─ router          # 路由跳转配置文件夹
└─ views           # 页面文件（首页、设备管理页）`,j=o({__name:`ProjectManage`,setup(o){return(o,j)=>(s(),t(`div`,d,[j[32]||=n(`<section class="page-hero" aria-labelledby="project-title" data-v-260f6bed><div class="container" data-v-260f6bed><span class="eyebrow" data-v-260f6bed>作业一 · Project Manage</span><h1 id="project-title" class="section-title" data-v-260f6bed>项目管理与网页搭建</h1><p class="section-desc" data-v-260f6bed> 基于 NexMaker Tate 在线仓库编辑器，搭建听障辅助设备 HearLink 的可视化管理网页。 </p></div></section>`,1),i(`section`,f,[i(`div`,p,[j[30]||=n(`<div class="meta-grid" data-v-260f6bed><div class="meta-item" data-v-260f6bed><span class="meta-label" data-v-260f6bed>开发工具</span><span class="meta-value" data-v-260f6bed>NexMaker Tate 在线仓库编辑器</span></div><div class="meta-item" data-v-260f6bed><span class="meta-label" data-v-260f6bed>技术栈</span><span class="meta-value" data-v-260f6bed>Vue3 + VueRouter + Element Plus</span></div><div class="meta-item meta-item--wide" data-v-260f6bed><span class="meta-label" data-v-260f6bed>项目用途</span><span class="meta-value" data-v-260f6bed> 听障辅助设备 HearLink 可视化管理网页，包含首页产品介绍、设备管理分页、路由超链接、动态数据渲染。 </span></div></div>`,1),i(`article`,m,[j[1]||=i(`h2`,{class:`doc-h2`},[i(`span`,{class:`doc-num`},`一`),a(`使用 Tate 打开项目仓库完整操作步骤`)],-1),j[2]||=i(`h3`,{class:`doc-h3`},`图1 · Tate 首页打开仓库界面`,-1),i(`figure`,h,[i(`img`,{src:e(c),alt:`Tate 编辑器打开 ZWU-2026-2-004 项目仓库的文件目录界面`},null,8,g),j[0]||=i(`figcaption`,null,`Tate 打开仓库后左侧自动生成项目文件目录`,-1)]),j[3]||=i(`ol`,{class:`doc-list`},[i(`li`,null,`打开 NexMaker Tate 网页编辑器，首页左侧工具栏找到【克隆/打开仓库】按钮；`),i(`li`,null,[a(`在输入框粘贴项目仓库地址 `),i(`code`,{class:`inline-code`},`https://github.com/nexmaker-fab/ZWU-2026-2-004.git`),a(`； `)]),i(`li`,null,`选择本地存放文件夹，点击确认克隆，等待仓库文件拉取完成；`),i(`li`,null,`加载完成后左侧自动生成文件目录：`)],-1),i(`pre`,{class:`code-block code-block--tree`},[i(`code`,null,r(A))]),j[4]||=n(`<h3 class="doc-h3" data-v-260f6bed>图2 · Tate 编辑器调试界面</h3><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed>左侧文件树点击 .vue 文件即可打开代码编辑区；</li><li data-v-260f6bed>中间为代码编辑面板，支持修改 HTML、CSS、JS；</li><li data-v-260f6bed>右侧实时预览窗口，修改代码后 1 秒自动渲染页面效果；</li><li data-v-260f6bed>顶部工具栏：素材上传、组件拖拽、仓库保存、网页打包发布。</li></ol><h3 class="doc-h3" data-v-260f6bed>Tate 内页面调整操作细节</h3><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>素材替换：</strong>将 HearLink 产品实拍图上传至 <code class="inline-code" data-v-260f6bed>assets/hearlink/</code>，替换页面内默认占位 img 路径； </li><li data-v-260f6bed><strong data-v-260f6bed>样式微调：</strong>选中卡片组件，右侧属性面板修改圆角、主色调 <code class="inline-code" data-v-260f6bed>#409EFF</code>（浅蓝无障碍配色）、字体大小； </li><li data-v-260f6bed><strong data-v-260f6bed>路由调试：</strong>修改 <code class="inline-code" data-v-260f6bed>router/index.js</code> 内页面路径，测试导航跳转无 404； </li><li data-v-260f6bed><strong data-v-260f6bed>仓库保存：</strong>每修改完成点击顶部【提交仓库】，同步线上代码。</li></ol>`,4)]),i(`article`,_,[j[13]||=i(`h2`,{class:`doc-h2`},[i(`span`,{class:`doc-num`},`二`),a(`AI 辅助提问全过程 + 完整对话记录`)],-1),j[14]||=i(`p`,{class:`doc-p`},`本人无前端开发基础，分 3 轮向 AI 分层索要代码，逐步完成项目：`,-1),i(`div`,v,[j[6]||=i(`h3`,{class:`doc-h3`},`提问1 · 获取项目基础整体框架`,-1),j[7]||=i(`blockquote`,{class:`prompt`},` 帮我写一个 Vue3 单页网站，用于展示听障震动提醒设备 HearLink，需要包含顶部导航栏、首页产品介绍页面、独立的设备管理子页面，配置 VueRouter 实现页面跳转，兼容电脑和手机端，使用 Element Plus 组件库，给出完整可运行目录与代码。 `,-1),i(`figure`,y,[i(`img`,{src:e(l),alt:`AI 编辑器返回项目框架与路由基础代码的对话界面`},null,8,b),j[5]||=i(`figcaption`,null,`AI 返回完整项目目录、路由基础代码与首页组件`,-1)]),j[8]||=i(`p`,{class:`doc-p doc-p--muted`},` AI 返回：完整项目目录、入口 index.html、路由基础代码、首页基础组件。 `,-1)]),i(`div`,x,[j[10]||=i(`h3`,{class:`doc-h3`},`提问2 · 实现导航超链接跳转功能`,-1),j[11]||=i(`blockquote`,{class:`prompt`},` 在上一套 Vue 代码基础上，给顶部导航栏增加【设备管理】超链接，点击跳转到设备管理页面，使用 router-link 实现；设备管理页面用卡片布局展示多台设备信息，搭配表格展示设备历史提醒记录。 `,-1),i(`figure`,S,[i(`img`,{src:e(u),alt:`AI 编辑器返回设备管理页面与导航跳转代码的对话界面`},null,8,C),j[9]||=i(`figcaption`,null,`AI 返回导航跳转代码、设备卡片组件与数据表格模板`,-1)]),j[12]||=i(`p`,{class:`doc-p doc-p--muted`},` AI 返回：导航栏跳转代码、设备卡片组件、数据表格模板。 `,-1)]),j[15]||=i(`div`,{class:`qa`},[i(`h3`,{class:`doc-h3`},`提问3 · 实现设备页面动态渲染逻辑`),i(`blockquote`,{class:`prompt`},` 完善设备管理页面，写模拟设备 JSON 数据源，页面加载时自动读取数据，用 v-for 循环批量渲染设备卡片；实现设备在线状态、剩余电量响应式展示，低电量设备卡片标红高亮，页面挂载时加载数据，给出完整 js 逻辑代码。 `),i(`p`,{class:`doc-p doc-p--muted`},` AI 返回：模拟设备数据、v-for 循环渲染代码、onMounted 数据加载、响应式状态判断代码。 `)],-1)]),i(`article`,{class:`doc-block`},[j[22]||=i(`h2`,{class:`doc-h2`},[i(`span`,{class:`doc-num doc-num--chat`},`💬`),a(`AI 对话完整记录`)],-1),j[23]||=i(`p`,{class:`doc-p doc-p--muted`},`Vue3 HearLink Website Development · 工作目录 c:\\Users\\admin\\Desktop\\mangrxiaoxi`,-1),i(`div`,{class:`chat`},[j[20]||=i(`div`,{class:`chat-msg chat-msg--user`},[i(`span`,{class:`chat-role`},`用户`),i(`div`,{class:`chat-body`},[i(`p`,null,`帮我写一个 Vue3 单页网站，用于展示听障震动提醒设备 HearLink，需要包含顶部导航栏、首页产品介绍页面、独立的设备管理子页面，配置 VueRouter 实现页面跳转，兼容电脑和手机端，使用 Element Plus 组件库，给出完整可运行目录与代码。`)])],-1),i(`div`,{class:`chat-msg chat-msg--ai`},[j[19]||=i(`span`,{class:`chat-role`},`AI 助手`,-1),i(`div`,{class:`chat-body`},[j[16]||=n(`<p data-v-260f6bed>我将帮您创建一个完整的 Vue3 单页网站来展示 HearLink 听障震动提醒设备。先查看现有项目结构和配置，再依次更新主入口（集成 Element Plus）、导航栏组件、路由配置，并创建 HearLink 首页与设备管理页面。</p><h4 data-v-260f6bed>项目概述</h4><p data-v-260f6bed>这是一个功能完整的 Vue3 单页应用，主要功能：</p><ul class="chat-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>首页：</strong>产品展示，包含 Hero 区域、核心功能、技术规格、使用场景等；</li><li data-v-260f6bed><strong data-v-260f6bed>设备管理：</strong>完整的设备管理界面，支持设备连接、通知设置、震动配置、系统设置；</li><li data-v-260f6bed><strong data-v-260f6bed>功能特点：</strong>详细的产品功能介绍和技术参数展示；</li><li data-v-260f6bed><strong data-v-260f6bed>关于我们：</strong>公司介绍、团队信息、发展历程、常见问题等。</li></ul><p data-v-260f6bed>技术特色：Vue3 + Vue Router 单页应用、Element Plus 组件库、完全响应式设计、渐变色现代化 UI、丰富的交互动画。</p><h4 data-v-260f6bed>项目结构</h4>`,6),i(`pre`,{class:`code-block code-block--tree`},[i(`code`,null,r(w))]),j[17]||=i(`h4`,null,`快速开始`,-1),i(`pre`,{class:`code-block`},[i(`code`,null,r(T))]),j[18]||=n(`<h4 data-v-260f6bed>页面说明</h4><ul class="chat-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>首页 <code class="inline-code" data-v-260f6bed>/</code>：</strong>Hero 区域（产品标题 + 设备动画）、核心功能（4 个卡片）、技术规格、使用场景（4 个）、CTA 区域；</li><li data-v-260f6bed><strong data-v-260f6bed>设备管理 <code class="inline-code" data-v-260f6bed>/device-management</code>：</strong>设备列表（连接/断开）、通知设置、震动设置（强度/模式/时长）、系统设置；</li><li data-v-260f6bed><strong data-v-260f6bed>功能特点 <code class="inline-code" data-v-260f6bed>/features</code>：</strong>分类筛选、功能详情、6 个关键指标卡片；</li><li data-v-260f6bed><strong data-v-260f6bed>关于我们 <code class="inline-code" data-v-260f6bed>/about</code>：</strong>公司使命、核心团队、发展历程时间线、FAQ 折叠面板、联系方式。</li></ul><h4 data-v-260f6bed>响应式与技术栈</h4><p data-v-260f6bed>完全响应式，支持桌面（1200px+）、平板（768–1200px）、手机（&lt;768px）。技术栈：Vue 3、Vue Router、Element Plus、Vite。主色调 <code class="inline-code" data-v-260f6bed>#667eea → #764ba2</code> 渐变，成功色 <code class="inline-code" data-v-260f6bed>#67c23a</code>、警告色 <code class="inline-code" data-v-260f6bed>#e6a23c</code>、错误色 <code class="inline-code" data-v-260f6bed>#f56c6c</code>。</p><p data-v-260f6bed>项目已完全可运行，安装依赖即可体验完整的 HearLink 产品展示网站。</p>`,5)])]),j[21]||=n(`<div class="chat-msg chat-msg--user" data-v-260f6bed><span class="chat-role" data-v-260f6bed>用户</span><div class="chat-body" data-v-260f6bed><p data-v-260f6bed>在上一套 Vue 代码基础上，给顶部导航栏增加【设备管理】超链接，点击跳转到设备管理页面，使用 router-link 实现；设备管理页面用卡片布局展示多台设备信息，搭配表格展示设备历史提醒记录。</p></div></div><div class="chat-msg chat-msg--ai" data-v-260f6bed><span class="chat-role" data-v-260f6bed>AI 助手</span><div class="chat-body" data-v-260f6bed><p data-v-260f6bed>导航栏已包含【设备管理】链接（<code class="inline-code" data-v-260f6bed>router-link</code> 跳转 <code class="inline-code" data-v-260f6bed>/device-management</code>）。在设备管理页面新增了完整的【历史记录】标签页：</p><ul class="chat-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>筛选工具栏：</strong>设备筛选、提醒类型筛选（门铃、电话、烟雾报警、闹钟、消息、自定义）、日期范围、重置与导出；</li><li data-v-260f6bed><strong data-v-260f6bed>统计信息卡片：</strong>已送达（绿）、已错过（红）、总记录数（蓝）、筛选结果数（橙）；</li><li data-v-260f6bed><strong data-v-260f6bed>历史记录表格：</strong>ID、设备名称、提醒类型、提醒时间、震动时长、状态，支持删除单条、彩色类型图标、状态标签；</li><li data-v-260f6bed><strong data-v-260f6bed>分页功能：</strong>支持 5/10/20/50 条每页与完整分页导航。</li></ul><p data-v-260f6bed>设计上设备信息采用卡片式、历史记录采用表格、统计信息独立卡片，桌面/平板/手机端均适配。主要改动文件：<code class="inline-code" data-v-260f6bed>NavBar.vue</code>、<code class="inline-code" data-v-260f6bed>DeviceManagement.vue</code>、<code class="inline-code" data-v-260f6bed>router/index.js</code>。</p></div></div><div class="chat-msg chat-msg--user" data-v-260f6bed><span class="chat-role" data-v-260f6bed>用户</span><div class="chat-body" data-v-260f6bed><p data-v-260f6bed>完善设备管理页面，写模拟设备 JSON 数据源，页面加载时自动读取数据，用 v-for 循环批量渲染设备卡片；实现设备在线状态、剩余电量响应式展示，低电量设备卡片标红高亮，页面挂载时加载数据，给出完整 js 逻辑代码。</p></div></div><div class="chat-msg chat-msg--ai" data-v-260f6bed><span class="chat-role" data-v-260f6bed>AI 助手</span><div class="chat-body" data-v-260f6bed><p class="chat-error" data-v-260f6bed>Error: We&#39;re sorry, the request queue size is exceed. Please wait and try again later.</p></div></div>`,4)])]),i(`article`,{class:`doc-block`},[j[24]||=n(`<h2 class="doc-h2" data-v-260f6bed><span class="doc-num" data-v-260f6bed>三</span>项目全套核心代码</h2><h3 class="doc-h3" data-v-260f6bed>1. 路由配置文件 <code class="inline-code" data-v-260f6bed>src/router/index.js</code></h3><p class="doc-p doc-p--muted" data-v-260f6bed>实现超链接跳转核心</p>`,3),i(`pre`,{class:`code-block`},[i(`code`,null,r(E))]),j[25]||=i(`h3`,{class:`doc-h3`},[a(`2. 全局根页面 `),i(`code`,{class:`inline-code`},`App.vue`)],-1),j[26]||=i(`p`,{class:`doc-p doc-p--muted`},`导航超链接入口`,-1),i(`pre`,{class:`code-block`},[i(`code`,null,r(D))]),j[27]||=i(`h3`,{class:`doc-h3`},[a(`3. 设备管理页面 `),i(`code`,{class:`inline-code`},`src/views/DeviceManage.vue`)],-1),j[28]||=i(`p`,{class:`doc-p doc-p--muted`},`核心页面，动态渲染逻辑`,-1),i(`pre`,{class:`code-block`},[i(`code`,null,r(O))]),j[29]||=i(`h3`,{class:`doc-h3`},[a(`4. 首页页面 `),i(`code`,{class:`inline-code`},`src/views/Home.vue`)],-1),i(`pre`,{class:`code-block`},[i(`code`,null,r(k))])]),j[31]||=n(`<article class="doc-block" data-v-260f6bed><h2 class="doc-h2" data-v-260f6bed><span class="doc-num" data-v-260f6bed>四</span>设备管理页面详细功能说明</h2><h3 class="doc-h3" data-v-260f6bed>1. 页面功能分区</h3><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>导航跳转区：</strong>复用全局导航，router-link 超链接实现首页↔设备管理页无刷新切换；</li><li data-v-260f6bed><strong data-v-260f6bed>设备卡片展示区：</strong>核心动态渲染模块，自动读取 deviceList 数组批量生成卡片；</li><li data-v-260f6bed><strong data-v-260f6bed>状态预警：</strong>电量低于 20% 自动添加红色边框底色，区分低电量故障设备；</li><li data-v-260f6bed><strong data-v-260f6bed>历史记录表：</strong>渲染设备触发声音的全部日志，记录声源类型、时间、震动档位。</li></ol><h3 class="doc-h3" data-v-260f6bed>2. 超链接跳转实现原理</h3><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed>使用 Vue 官方 <code class="inline-code" data-v-260f6bed>&lt;router-link&gt;</code> 标签替代原生 a 标签，属于前端路由超链接；</li><li data-v-260f6bed><code class="inline-code" data-v-260f6bed>to=&quot;/device-manage&quot;</code> 绑定路由文件中配置的页面路径；</li><li data-v-260f6bed>点击后不会刷新整个网页，仅替换 <code class="inline-code" data-v-260f6bed>&lt;router-view&gt;</code> 区域内容，页面切换流畅；</li><li data-v-260f6bed>Tate 编辑器修改路由 path 后，右侧预览窗口可实时测试跳转效果。</li></ol><h3 class="doc-h3" data-v-260f6bed>3. 页面动态渲染完整原理</h3><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>数据层：</strong><code class="inline-code" data-v-260f6bed>ref()</code> 创建响应式数组 deviceList 存储所有设备信息；</li><li data-v-260f6bed><strong data-v-260f6bed>挂载加载：</strong><code class="inline-code" data-v-260f6bed>onMounted</code> 生命周期函数，页面 DOM 加载完成后自动加载数据源；</li><li data-v-260f6bed><strong data-v-260f6bed>批量渲染：</strong><code class="inline-code" data-v-260f6bed>v-for=&quot;item in deviceList&quot;</code> 循环遍历数组，每条数据生成一张独立设备卡片，<code class="inline-code" data-v-260f6bed>key=&quot;item.id&quot;</code> 保证渲染性能；</li><li data-v-260f6bed><strong data-v-260f6bed>状态响应更新：</strong>修改 item.power、item.online 数值，页面卡片文字、红色预警样式会自动同步刷新，无需手动重载网页；</li><li data-v-260f6bed><strong data-v-260f6bed>Tate 渲染机制：</strong>编辑器内置 Vue 实时编译引擎，修改 JS 数据/模板代码后，右侧预览面板即时执行渲染，直观看到页面变化。</li></ol></article><article class="doc-block" data-v-260f6bed><h2 class="doc-h2" data-v-260f6bed><span class="doc-num" data-v-260f6bed>五</span>整体搭建总结</h2><p class="doc-p" data-v-260f6bed>整个网页开发分为四大阶段：</p><ol class="doc-list" data-v-260f6bed><li data-v-260f6bed><strong data-v-260f6bed>仓库导入：</strong>Tate 克隆项目仓库，整理文件目录，完成基础环境搭建；</li><li data-v-260f6bed><strong data-v-260f6bed>AI 辅助编码：</strong>分 3 次定向提问 AI，依次拿到项目框架、路由跳转代码、动态渲染逻辑；</li><li data-v-260f6bed><strong data-v-260f6bed>可视化调试：</strong>在 Tate 编辑器修改素材、配色、路由参数，实时预览页面效果；</li><li data-v-260f6bed><strong data-v-260f6bed>页面功能落地：</strong>路由超链接实现分页切换，v-for 循环完成设备管理页面动态数据渲染，实现设备状态可视化监测。</li></ol><p class="doc-p closing" data-v-260f6bed> 整套代码可直接在 Tate 仓库中运行，最终发布为线上可访问网页，满足听障设备数据可视化展示需求。 </p></article>`,2)])])]))}},[[`__scopeId`,`data-v-260f6bed`]]);export{j as default};