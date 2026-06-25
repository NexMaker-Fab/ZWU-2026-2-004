import{d as e,f as t,k as n,l as r,p as i,t as a,y as o}from"./index-RyKdWDlo.js";var s={class:`project-manage`},c=`import { createRouter, createWebHashHistory } from 'vue-router'
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
export default router`,l=`<template>
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
</style>`,u=`<template>
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
</style>`,d=`<template>
  <div class="home" style="padding:40px">
    <h1>HearLink 听障智能声光震动提醒设备</h1>
    <img src="@/assets/hearlink/main.png" width="600"/>
    <p>三重提醒：震动+LED灯光+OLED文字，识别门铃、来电、火警环境音，帮助听障人群捕捉生活声音。</p>
    <p>点击顶部导航【设备管理】查看全部设备运行数据</p>
  </div>
</template>`,f=`ZWU-2026-2-004
├─ src
│  ├─ views        # 页面文件（首页、设备管理页）
│  ├─ router       # 路由跳转配置
│  ├─ assets       # 产品图片、素材
│  └─ App.vue      # 全局根页面
├─ index.html      # 网页入口文件
└─ package.json    # 项目依赖配置`,p=a({__name:`ProjectManage`,setup(a){return(a,p)=>(o(),e(`div`,s,[p[11]||=t(`<section class="page-hero" aria-labelledby="project-title" data-v-bf7e2119><div class="container" data-v-bf7e2119><span class="eyebrow" data-v-bf7e2119>作业一 · Project Manage</span><h1 id="project-title" class="section-title" data-v-bf7e2119>项目管理与网页搭建</h1><p class="section-desc" data-v-bf7e2119> 基于 NexMaker Tate 在线仓库编辑器，搭建听障辅助设备 HearLink 的可视化管理网页。 </p></div></section>`,1),r(`section`,{class:`doc section`},[r(`div`,{class:`container doc__container`},[p[8]||=t(`<div class="meta-grid" data-v-bf7e2119><div class="meta-item" data-v-bf7e2119><span class="meta-label" data-v-bf7e2119>开发工具</span><span class="meta-value" data-v-bf7e2119>NexMaker Tate 在线仓库编辑器</span></div><div class="meta-item" data-v-bf7e2119><span class="meta-label" data-v-bf7e2119>技术栈</span><span class="meta-value" data-v-bf7e2119>Vue3 + VueRouter + Element Plus</span></div><div class="meta-item meta-item--wide" data-v-bf7e2119><span class="meta-label" data-v-bf7e2119>项目用途</span><span class="meta-value" data-v-bf7e2119> 听障辅助设备 HearLink 可视化管理网页，包含首页产品介绍、设备管理分页、路由超链接、动态数据渲染。 </span></div></div>`,1),r(`article`,{class:`doc-block`},[p[0]||=t(`<h2 class="doc-h2" data-v-bf7e2119><span class="doc-num" data-v-bf7e2119>一</span>使用 Tate 打开项目仓库完整操作步骤</h2><h3 class="doc-h3" data-v-bf7e2119>图1 · Tate 首页打开仓库界面</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119>打开 NexMaker Tate 网页编辑器，首页左侧工具栏找到【克隆/打开仓库】按钮；</li><li data-v-bf7e2119>在输入框粘贴项目仓库地址 <code class="inline-code" data-v-bf7e2119>https://github.com/nexmaker-fab/ZWU-2026-2-004.git</code>； </li><li data-v-bf7e2119>选择本地存放文件夹，点击确认克隆，等待仓库文件拉取完成；</li><li data-v-bf7e2119>加载完成后左侧自动生成文件目录：</li></ol>`,3),r(`pre`,{class:`code-block code-block--tree`},[r(`code`,null,n(f))]),p[1]||=t(`<h3 class="doc-h3" data-v-bf7e2119>图2 · Tate 编辑器调试界面</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119>左侧文件树点击 .vue 文件即可打开代码编辑区；</li><li data-v-bf7e2119>中间为代码编辑面板，支持修改 HTML、CSS、JS；</li><li data-v-bf7e2119>右侧实时预览窗口，修改代码后 1 秒自动渲染页面效果；</li><li data-v-bf7e2119>顶部工具栏：素材上传、组件拖拽、仓库保存、网页打包发布。</li></ol><h3 class="doc-h3" data-v-bf7e2119>Tate 内页面调整操作细节</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119><strong data-v-bf7e2119>素材替换：</strong>将 HearLink 产品实拍图上传至 <code class="inline-code" data-v-bf7e2119>assets/hearlink/</code>，替换页面内默认占位 img 路径； </li><li data-v-bf7e2119><strong data-v-bf7e2119>样式微调：</strong>选中卡片组件，右侧属性面板修改圆角、主色调 <code class="inline-code" data-v-bf7e2119>#409EFF</code>（浅蓝无障碍配色）、字体大小； </li><li data-v-bf7e2119><strong data-v-bf7e2119>路由调试：</strong>修改 <code class="inline-code" data-v-bf7e2119>router/index.js</code> 内页面路径，测试导航跳转无 404； </li><li data-v-bf7e2119><strong data-v-bf7e2119>仓库保存：</strong>每修改完成点击顶部【提交仓库】，同步线上代码。</li></ol>`,4)]),p[9]||=t(`<article class="doc-block" data-v-bf7e2119><h2 class="doc-h2" data-v-bf7e2119><span class="doc-num" data-v-bf7e2119>二</span>AI 辅助提问全过程 + 完整对话记录</h2><p class="doc-p" data-v-bf7e2119>本人无前端开发基础，分 3 轮向 AI 分层索要代码，逐步完成项目：</p><div class="qa" data-v-bf7e2119><h3 class="doc-h3" data-v-bf7e2119>提问1 · 获取项目基础整体框架</h3><blockquote class="prompt" data-v-bf7e2119> 帮我写一个 Vue3 单页网站，用于展示听障震动提醒设备 HearLink，需要包含顶部导航栏、首页产品介绍页面、独立的设备管理子页面，配置 VueRouter 实现页面跳转，兼容电脑和手机端，使用 Element Plus 组件库，给出完整可运行目录与代码。 </blockquote><p class="doc-p doc-p--muted" data-v-bf7e2119> AI 返回：完整项目目录、入口 index.html、路由基础代码、首页基础组件。 </p></div><div class="qa" data-v-bf7e2119><h3 class="doc-h3" data-v-bf7e2119>提问2 · 实现导航超链接跳转功能</h3><blockquote class="prompt" data-v-bf7e2119> 在上一套 Vue 代码基础上，给顶部导航栏增加【设备管理】超链接，点击跳转到设备管理页面，使用 router-link 实现；设备管理页面用卡片布局展示多台设备信息，搭配表格展示设备历史提醒记录。 </blockquote><p class="doc-p doc-p--muted" data-v-bf7e2119> AI 返回：导航栏跳转代码、设备卡片组件、数据表格模板。 </p></div><div class="qa" data-v-bf7e2119><h3 class="doc-h3" data-v-bf7e2119>提问3 · 实现设备页面动态渲染逻辑</h3><blockquote class="prompt" data-v-bf7e2119> 完善设备管理页面，写模拟设备 JSON 数据源，页面加载时自动读取数据，用 v-for 循环批量渲染设备卡片；实现设备在线状态、剩余电量响应式展示，低电量设备卡片标红高亮，页面挂载时加载数据，给出完整 js 逻辑代码。 </blockquote><p class="doc-p doc-p--muted" data-v-bf7e2119> AI 返回：模拟设备数据、v-for 循环渲染代码、onMounted 数据加载、响应式状态判断代码。 </p></div></article>`,1),r(`article`,{class:`doc-block`},[p[2]||=t(`<h2 class="doc-h2" data-v-bf7e2119><span class="doc-num" data-v-bf7e2119>三</span>项目全套核心代码</h2><h3 class="doc-h3" data-v-bf7e2119>1. 路由配置文件 <code class="inline-code" data-v-bf7e2119>src/router/index.js</code></h3><p class="doc-p doc-p--muted" data-v-bf7e2119>实现超链接跳转核心</p>`,3),r(`pre`,{class:`code-block`},[r(`code`,null,n(c))]),p[3]||=r(`h3`,{class:`doc-h3`},[i(`2. 全局根页面 `),r(`code`,{class:`inline-code`},`App.vue`)],-1),p[4]||=r(`p`,{class:`doc-p doc-p--muted`},`导航超链接入口`,-1),r(`pre`,{class:`code-block`},[r(`code`,null,n(l))]),p[5]||=r(`h3`,{class:`doc-h3`},[i(`3. 设备管理页面 `),r(`code`,{class:`inline-code`},`src/views/DeviceManage.vue`)],-1),p[6]||=r(`p`,{class:`doc-p doc-p--muted`},`核心页面，动态渲染逻辑`,-1),r(`pre`,{class:`code-block`},[r(`code`,null,n(u))]),p[7]||=r(`h3`,{class:`doc-h3`},[i(`4. 首页页面 `),r(`code`,{class:`inline-code`},`src/views/Home.vue`)],-1),r(`pre`,{class:`code-block`},[r(`code`,null,n(d))])]),p[10]||=t(`<article class="doc-block" data-v-bf7e2119><h2 class="doc-h2" data-v-bf7e2119><span class="doc-num" data-v-bf7e2119>四</span>设备管理页面详细功能说明</h2><h3 class="doc-h3" data-v-bf7e2119>1. 页面功能分区</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119><strong data-v-bf7e2119>导航跳转区：</strong>复用全局导航，router-link 超链接实现首页↔设备管理页无刷新切换；</li><li data-v-bf7e2119><strong data-v-bf7e2119>设备卡片展示区：</strong>核心动态渲染模块，自动读取 deviceList 数组批量生成卡片；</li><li data-v-bf7e2119><strong data-v-bf7e2119>状态预警：</strong>电量低于 20% 自动添加红色边框底色，区分低电量故障设备；</li><li data-v-bf7e2119><strong data-v-bf7e2119>历史记录表：</strong>渲染设备触发声音的全部日志，记录声源类型、时间、震动档位。</li></ol><h3 class="doc-h3" data-v-bf7e2119>2. 超链接跳转实现原理</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119>使用 Vue 官方 <code class="inline-code" data-v-bf7e2119>&lt;router-link&gt;</code> 标签替代原生 a 标签，属于前端路由超链接；</li><li data-v-bf7e2119><code class="inline-code" data-v-bf7e2119>to=&quot;/device-manage&quot;</code> 绑定路由文件中配置的页面路径；</li><li data-v-bf7e2119>点击后不会刷新整个网页，仅替换 <code class="inline-code" data-v-bf7e2119>&lt;router-view&gt;</code> 区域内容，页面切换流畅；</li><li data-v-bf7e2119>Tate 编辑器修改路由 path 后，右侧预览窗口可实时测试跳转效果。</li></ol><h3 class="doc-h3" data-v-bf7e2119>3. 页面动态渲染完整原理</h3><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119><strong data-v-bf7e2119>数据层：</strong><code class="inline-code" data-v-bf7e2119>ref()</code> 创建响应式数组 deviceList 存储所有设备信息；</li><li data-v-bf7e2119><strong data-v-bf7e2119>挂载加载：</strong><code class="inline-code" data-v-bf7e2119>onMounted</code> 生命周期函数，页面 DOM 加载完成后自动加载数据源；</li><li data-v-bf7e2119><strong data-v-bf7e2119>批量渲染：</strong><code class="inline-code" data-v-bf7e2119>v-for=&quot;item in deviceList&quot;</code> 循环遍历数组，每条数据生成一张独立设备卡片，<code class="inline-code" data-v-bf7e2119>key=&quot;item.id&quot;</code> 保证渲染性能；</li><li data-v-bf7e2119><strong data-v-bf7e2119>状态响应更新：</strong>修改 item.power、item.online 数值，页面卡片文字、红色预警样式会自动同步刷新，无需手动重载网页；</li><li data-v-bf7e2119><strong data-v-bf7e2119>Tate 渲染机制：</strong>编辑器内置 Vue 实时编译引擎，修改 JS 数据/模板代码后，右侧预览面板即时执行渲染，直观看到页面变化。</li></ol></article><article class="doc-block" data-v-bf7e2119><h2 class="doc-h2" data-v-bf7e2119><span class="doc-num" data-v-bf7e2119>五</span>整体搭建总结</h2><p class="doc-p" data-v-bf7e2119>整个网页开发分为四大阶段：</p><ol class="doc-list" data-v-bf7e2119><li data-v-bf7e2119><strong data-v-bf7e2119>仓库导入：</strong>Tate 克隆项目仓库，整理文件目录，完成基础环境搭建；</li><li data-v-bf7e2119><strong data-v-bf7e2119>AI 辅助编码：</strong>分 3 次定向提问 AI，依次拿到项目框架、路由跳转代码、动态渲染逻辑；</li><li data-v-bf7e2119><strong data-v-bf7e2119>可视化调试：</strong>在 Tate 编辑器修改素材、配色、路由参数，实时预览页面效果；</li><li data-v-bf7e2119><strong data-v-bf7e2119>页面功能落地：</strong>路由超链接实现分页切换，v-for 循环完成设备管理页面动态数据渲染，实现设备状态可视化监测。</li></ol><p class="doc-p closing" data-v-bf7e2119> 整套代码可直接在 Tate 仓库中运行，最终发布为线上可访问网页，满足听障设备数据可视化展示需求。 </p></article>`,2)])])]))}},[[`__scopeId`,`data-v-bf7e2119`]]);export{p as default};