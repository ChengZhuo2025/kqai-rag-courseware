window.COURSE_DATA = {
  "title": "从简历优化到智能体：用 AI 编程搭建求职助手",
  "chapters": [
    {
      "label": "看见能力",
      "start": 0
    },
    {
      "label": "一起动手",
      "start": 3
    },
    {
      "label": "看懂路径",
      "start": 7
    },
    {
      "label": "继续成长",
      "start": 10
    }
  ],
  "slides": [
    {
      "title": "AI 求职助手",
      "chapter": "看见能力",
      "time": "00:00–02:00",
      "html": "<div class=\"cover-scene\">\n        <img class=\"cover-art\" src=\"assets/ai-hero.png\" alt=\"公司资料中的 AI 主题视觉\">\n        <div class=\"cover-shade\"></div>\n        <div class=\"cover-copy\">\n          <p class=\"cover-kicker\">鲲穹 AI · 周六试听体验</p>\n          <h1>AI 求职助手</h1>\n          <p class=\"cover-subtitle\">从简历优化，到智能体开发</p>\n          <p class=\"cover-description\">一份岗位描述，看看 AI 怎样把想法变成可体验的小工具。</p>\n          <span class=\"cover-prompt\"><i data-lucide=\"mouse-pointer-2\"></i> 一起看见 AI 能做什么</span>\n        </div>\n        <div class=\"cover-foot\"><span>90 分钟体验课</span><span>成果演示 · 轻量共创 · 学习路线</span></div>\n      </div>"
    },
    {
      "title": "同一份简历，岗位不同，重点也不同",
      "chapter": "看见能力",
      "time": "02:00–05:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">一个熟悉的求职场景</p><h2>同一份简历，<em>岗位不同</em>，重点也不同</h2><p class=\"subtitle\">AI 可以帮我们整理信息，先把经历讲清楚。</p></div>\n        <div class=\"role-compare\">\n          <div class=\"role-sheet role-left\" data-fragment-index=\"0\"><span class=\"role-index\">01 / 目标岗位</span><h3>AI 产品运营助理</h3><p>更关心用户反馈、内容表达和任务推进。</p><div class=\"role-focus\"><i data-lucide=\"message-square-text\"></i><span>经历怎样对应岗位需要？</span></div></div>\n          <div class=\"role-bridge\" aria-hidden=\"true\"><span>同一段经历</span><i data-lucide=\"move-horizontal\"></i></div>\n          <div class=\"role-sheet role-right\" data-fragment-index=\"1\"><span class=\"role-index\">02 / 目标岗位</span><h3>AI 应用开发实习</h3><p>更关心问题拆解、工具使用和功能验证。</p><div class=\"role-focus\"><i data-lucide=\"blocks\"></i><span>你怎样把想法做成工具？</span></div></div>\n        </div>\n        <div class=\"bottom-callout\" data-fragment-index=\"2\"><strong>先看结果</strong><span>岗位描述 + 简历样例 → 一份可继续修改的求职建议</span></div>"
    },
    {
      "title": "求职助手，可以这样用",
      "chapter": "看见能力",
      "time": "05:00–12:00",
      "html": "<div class=\"slide-head demo-head\"><div class=\"section-line\"></div><p class=\"small-label\">成品先行 · 课件内置互动样例</p><h2>求职助手，可以这样用</h2></div>\n        <div class=\"resume-app\">\n          <div class=\"app-input\">\n            <div class=\"app-topline\"><span class=\"app-brand\"><span class=\"app-mark\"><i data-lucide=\"sparkles\"></i></span>求职助手</span><span class=\"sample-badge\">虚构样例</span></div>\n            <label for=\"demo-role\">目标岗位</label>\n            <select id=\"demo-role\" aria-label=\"选择目标岗位\"><option value=\"product\">AI 产品运营助理</option><option value=\"developer\">AI 应用开发实习</option><option value=\"content\">新媒体运营助理</option></select>\n            <label for=\"demo-resume\">简历片段</label>\n            <textarea id=\"demo-resume\" readonly>参与校园科技活动宣传，协助整理报名问题并跟进现场安排。</textarea>\n            <button class=\"app-run\" id=\"demo-generate\"><i data-lucide=\"wand-sparkles\"></i><span>更新岗位建议</span></button>\n            <small class=\"app-boundary\">课堂预设结果，不连接在线模型</small>\n          </div>\n          <div class=\"app-output\" aria-live=\"polite\">\n            <div class=\"output-top\"><span><i data-lucide=\"scan-search\"></i>岗位匹配建议</span><span class=\"output-state\" id=\"demo-state\">预设样例</span></div>\n            <div id=\"demo-placeholder\" class=\"output-placeholder\" hidden><i data-lucide=\"arrow-left\"></i><span>选择岗位后，查看这段经历可以怎样表达。</span></div>\n            <div id=\"demo-result\" class=\"output-result\">\n              <div class=\"match-line\"><span>经历亮点</span><strong id=\"demo-focus\">用户反馈与活动推进</strong></div>\n              <p id=\"demo-advice\">把“整理报名问题”说具体：你发现了哪些重复问题，又怎样协助团队回应？</p>\n              <div class=\"question-preview\"><span><i data-lucide=\"messages-square\"></i>面试追问</span><strong id=\"demo-question\">讲一个你根据报名反馈调整活动安排的例子。</strong></div>\n            </div>\n          </div>\n        </div>\n        <p class=\"demo-note\"><i data-lucide=\"info\"></i>首屏已展示虚构岗位的预设结果，可切换岗位看变化；真实 AI 输出由讲师在选定工具中演示。</p>"
    },
    {
      "title": "你选岗位，建议就会改变",
      "chapter": "一起动手",
      "time": "12:00–20:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">学员参与 · 选择一个你感兴趣的方向</p><h2>你选岗位，<em>建议就会改变</em></h2><p class=\"subtitle\">试试选一个岗位，再看助手追问什么。</p></div>\n        <div class=\"role-picker\" role=\"group\" aria-label=\"选择体验岗位\">\n          <button class=\"role-choice active\" data-role=\"product\" aria-pressed=\"true\"><span>01</span><strong>AI 产品运营</strong><small>用户反馈 · 内容表达</small></button>\n          <button class=\"role-choice\" data-role=\"developer\" aria-pressed=\"false\"><span>02</span><strong>AI 应用开发</strong><small>功能拆解 · 工具验证</small></button>\n          <button class=\"role-choice\" data-role=\"content\" aria-pressed=\"false\"><span>03</span><strong>新媒体运营</strong><small>选题策划 · 效果复盘</small></button>\n        </div>\n        <div class=\"role-result\" aria-live=\"polite\">\n          <div class=\"role-result-label\"><span class=\"pulse-dot\"></span><span id=\"role-result-title\">AI 产品运营助理 · 面试问题</span></div>\n          <blockquote id=\"role-result-question\">“你提到整理报名问题，能说说你怎样判断哪些问题值得优先回应吗？”</blockquote>\n          <div class=\"result-foot\"><span><i data-lucide=\"sparkles\"></i>同一经历，不同岗位视角</span><span>教学预设样例</span></div>\n        </div>\n        <div class=\"audience-prompt\" data-fragment-index=\"0\"><strong>现场提问</strong><span>你希望助手根据哪个岗位继续追问？</span></div>"
    },
    {
      "title": "把经历说具体，不替经历加戏",
      "chapter": "一起动手",
      "time": "20:00–28:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">从“能写”到“可信”</p><h2>把经历说具体，<em>不替经历加戏</em></h2></div>\n        <div class=\"rewrite-stage\">\n          <div class=\"rewrite-before\"><span class=\"rewrite-label\">原始表达</span><blockquote>“参与校园科技活动宣传。”</blockquote><p>内容真实，但读者还不知道你具体做了什么。</p></div>\n          <div class=\"rewrite-arrow\"><i data-lucide=\"move-right\"></i><span>补充事实 · 调整表达</span></div>\n          <div class=\"rewrite-after\"><span class=\"rewrite-label\">更清楚的表达</span><blockquote>“协助发布活动信息，整理报名者常见问题，并跟进现场安排。”</blockquote><p>保留原有事实，把动作写清楚。</p></div>\n        </div>\n        <div class=\"fact-guard\"><i data-lucide=\"shield-check\"></i><span><strong>没有提供的数据，不让 AI 代填。</strong>先追问，再由本人确认。</span></div>\n        <p class=\"fiction-label\">以上为虚构课堂样例，不对应真实学员经历。</p>"
    },
    {
      "title": "让 AI 帮助手多做一步",
      "chapter": "一起动手",
      "time": "28:00–38:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">讲师演示 · 在准备好的原型上改一处</p><h2>让 AI 助手<em>多做一步</em></h2><p class=\"subtitle\">把“模拟面试”加进刚才的求职工具。</p></div>\n        <div class=\"build-stage\">\n          <div class=\"build-prompt\"><span class=\"prompt-label\"><i data-lucide=\"text-cursor-input\"></i>给 AI 编程工具的需求</span><p>“增加模拟面试模式：每次只问一道题，并根据回答继续追问。”</p><button id=\"build-preview\" class=\"build-action\"><i data-lucide=\"play\"></i><span>查看原型改造过程</span></button><small>演示动画 · 真实改造由讲师在 AI 编程工具中操作</small></div>\n          <div class=\"build-visual\" id=\"build-visual\" aria-live=\"polite\">\n            <div class=\"build-window\"><div class=\"window-bar\"><span></span><span></span><span></span><small>AI 求职助手</small></div><div class=\"window-content\"><div class=\"window-side\"><i data-lucide=\"file-user\"></i><span>简历建议</span><i data-lucide=\"messages-square\"></i><span>面试准备</span></div><div class=\"window-main\"><span class=\"window-eyebrow\">AI 产品运营助理</span><strong>先讲一个你处理用户反馈的例子</strong><button class=\"followup-chip\" id=\"followup-chip\" hidden><i data-lucide=\"corner-down-right\"></i>根据你的回答继续追问</button><div class=\"window-lines\"><b></b><b></b><b></b></div></div></div></div>\n            <div class=\"build-stamp\" id=\"build-stamp\"><i data-lucide=\"sparkles\"></i><span>新增：连续追问</span></div>\n          </div>\n        </div>\n        <div class=\"build-result\" id=\"build-result\" aria-live=\"polite\"><span class=\"result-indicator\"></span><span>准备好需求，AI 可以协助我们把功能变成看得见的界面。</span></div>"
    },
    {
      "title": "AI 能润色，事实要由你把关",
      "chapter": "一起动手",
      "time": "38:00–45:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">人机协作 · 留住真实</p><h2>AI 能润色，<em>事实要由你把关</em></h2></div>\n        <div class=\"review-scene\">\n          <div class=\"review-claim\"><span class=\"review-mark\"><i data-lucide=\"sparkles\"></i></span><div><small>AI 草稿</small><strong>“活动报名人数提升了 50%。”</strong><p>样例简历没有提供人数或对比数据。</p></div></div>\n          <div class=\"review-judge\"><span>核对事实</span><i data-lucide=\"arrow-right\"></i></div>\n          <div class=\"review-safe\"><span class=\"safe-mark\"><i data-lucide=\"shield-check\"></i></span><div><small>需要本人确认</small><strong>这个数字有记录支持吗？</strong><p>如果没有，就删掉数字，或补充可核实的资料。</p></div></div>\n        </div>\n        <div class=\"review-principle\"><span>AI 提供表达建议</span><i data-lucide=\"plus\"></i><span>本人确认事实</span><i data-lucide=\"equal\"></i><strong>可信的求职材料</strong></div>\n        <div class=\"halfway-mark\"><span>45 分钟</span><i data-lucide=\"arrow-down\"></i><span>接下来：看懂工具如何实现</span></div>"
    },
    {
      "title": "AI 怎样变成一个好用的工具？",
      "chapter": "看懂路径",
      "time": "45:00–52:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">轻量拆解 · 约 7 分钟</p><h2>AI 怎样变成一个<em>好用的工具</em>？</h2><p class=\"subtitle\">先看一条清楚的使用路径。</p></div>\n        <div class=\"capability-track\">\n          <div class=\"capability-stop\" data-fragment-index=\"0\"><span class=\"cap-number\">01</span><div class=\"cap-icon\"><i data-lucide=\"ear\"></i></div><h3>听懂需求</h3><p>岗位是什么？<br>学员想解决什么？</p></div>\n          <div class=\"cap-connector\" data-fragment-index=\"1\"><i data-lucide=\"move-right\"></i></div>\n          <div class=\"capability-stop\" data-fragment-index=\"1\"><span class=\"cap-number\">02</span><div class=\"cap-icon\"><i data-lucide=\"lightbulb\"></i></div><h3>给出建议</h3><p>整理信息、生成<br>可以继续修改的内容</p></div>\n          <div class=\"cap-connector\" data-fragment-index=\"2\"><i data-lucide=\"move-right\"></i></div>\n          <div class=\"capability-stop active\" data-fragment-index=\"2\"><span class=\"cap-number\">03</span><div class=\"cap-icon\"><i data-lucide=\"workflow\"></i></div><h3>接续任务</h3><p>调工具、问下一题<br>完成连续的步骤</p></div>\n        </div>\n        <div class=\"capability-caption\"><strong>提示词</strong><span>把要求说清楚</span><i data-lucide=\"plus\"></i><strong>模型</strong><span>理解和生成</span><i data-lucide=\"plus\"></i><strong>工具</strong><span>把结果带到下一步</span></div>"
    },
    {
      "title": "从一次回答，到连续协作",
      "chapter": "看懂路径",
      "time": "52:00–57:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">从“回答一个问题”到“接住一个任务”</p><h2>从一次回答，<em>到连续协作</em></h2></div>\n        <div class=\"agent-story\">\n          <div class=\"agent-request\"><span class=\"request-icon\"><i data-lucide=\"user-round\"></i></span><p>“帮我准备 AI 产品运营岗位面试。”</p></div>\n          <div class=\"agent-steps\">\n            <div class=\"agent-step\" data-fragment-index=\"0\"><span>01</span><i data-lucide=\"file-search\"></i><strong>对照岗位与经历</strong><small>找相关内容</small></div>\n            <i class=\"agent-arrow\" data-lucide=\"move-right\" data-fragment-index=\"1\"></i>\n            <div class=\"agent-step\" data-fragment-index=\"1\"><span>02</span><i data-lucide=\"list-checks\"></i><strong>整理准备重点</strong><small>看见差距</small></div>\n            <i class=\"agent-arrow\" data-lucide=\"move-right\" data-fragment-index=\"2\"></i>\n            <div class=\"agent-step\" data-fragment-index=\"2\"><span>03</span><i data-lucide=\"messages-square\"></i><strong>模拟面试追问</strong><small>根据回答接着问</small></div>\n          </div>\n          <div class=\"agent-summary\" data-fragment-index=\"3\"><i data-lucide=\"sparkles\"></i><span>一个助手，把几步相关任务接起来。</span><strong>这就是后续可学习的智能体思路</strong></div>\n        </div>"
    },
    {
      "title": "一起设计下一句追问",
      "chapter": "看懂路径",
      "time": "57:00–72:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">学员共创 · 约 15 分钟</p><h2>一起设计<em>下一句追问</em></h2><p class=\"subtitle\">候选人说：“我比较擅长沟通。”你会让助手接着问什么？</p></div>\n        <div class=\"challenge-layout\">\n          <div class=\"challenge-options\" role=\"group\" aria-label=\"选择一个面试追问\">\n            <button class=\"challenge-option\" data-challenge=\"example\" aria-pressed=\"false\"><span>A</span><strong>能举一个具体例子吗？</strong></button>\n            <button class=\"challenge-option\" data-challenge=\"result\" aria-pressed=\"false\"><span>B</span><strong>你怎样判断沟通有效？</strong></button>\n            <button class=\"challenge-option\" data-challenge=\"conflict\" aria-pressed=\"false\"><span>C</span><strong>遇到意见不同时，你怎么处理？</strong></button>\n          </div>\n          <div class=\"challenge-response\" id=\"challenge-response\" aria-live=\"polite\">\n            <span class=\"response-label\"><i data-lucide=\"messages-square\"></i>助手的下一句</span>\n            <p id=\"challenge-text\">选择一条追问，看看怎样把“沟通能力”落到具体经历。</p>\n            <small>预设教学样例 · 讲师可邀请学员现场补充问题</small>\n          </div>\n        </div>\n        <div class=\"challenge-bottom\"><span><strong>零基础：</strong>把问题问具体</span><span><strong>有基础：</strong>把追问设计成一个流程节点</span></div>"
    },
    {
      "title": "一个小工具，可以继续长成项目",
      "chapter": "继续成长",
      "time": "72:00–80:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">项目案例与平台 · 来自公司资料展示</p><h2>一个小工具，<em>可以继续长成项目</em></h2></div>\n        <div class=\"project-showcase\">\n          <figure class=\"platform-figure\"><img src=\"assets/model-platform-header.jpg\" alt=\"公司资料展示的智铸模型训练平台界面局部\"><figcaption>公司资料中的模型平台界面</figcaption></figure>\n          <div class=\"project-list\">\n            <div class=\"project-item\"><span class=\"project-symbol\"><i data-lucide=\"book-open-check\"></i></span><div><small>知识问答</small><strong>企业私有知识库 RAG</strong><p>让回答关联到可回看的资料。</p></div></div>\n            <div class=\"project-item\"><span class=\"project-symbol teal\"><i data-lucide=\"workflow\"></i></span><div><small>连续任务</small><strong>多智能体业务审批</strong><p>把多个处理步骤连成一个流程。</p></div></div>\n            <div class=\"project-item\"><span class=\"project-symbol orange\"><i data-lucide=\"file-code-2\"></i></span><div><small>应用交付</small><strong>全栈业务应用与部署</strong><p>从页面原型继续走向可运行的系统。</p></div></div>\n          </div>\n        </div>\n        <p class=\"project-note\"><i data-lucide=\"badge-check\"></i>项目名称与界面取自公司资料，具体展示以当前授权与项目状态为准。</p>"
    },
    {
      "title": "把兴趣接到一条学习路径上",
      "chapter": "继续成长",
      "time": "80:00–86:00",
      "html": "<div class=\"slide-head\"><div class=\"section-line\"></div><p class=\"small-label\">AI 应用与智能体开发项目班</p><h2>把兴趣接到<em>一条学习路径</em>上</h2><p class=\"subtitle\">从看懂 AI，到自己做出一个能运行的应用。</p></div>\n        <div class=\"learning-path\">\n          <div class=\"path-phase\"><span>阶段 01 · 起步</span><strong>模型与提示词</strong><p>理解对话、上下文和工作流。</p><small>第 1–2 周</small></div>\n          <div class=\"path-arrow\"><i data-lucide=\"move-right\"></i></div>\n          <div class=\"path-phase\"><span>阶段 02 · 开发</span><strong>Python 与接口</strong><p>让模型能力接入一个应用。</p><small>第 3–5 周</small></div>\n          <div class=\"path-arrow\"><i data-lucide=\"move-right\"></i></div>\n          <div class=\"path-phase\"><span>阶段 03 · 增强</span><strong>知识库与 RAG</strong><p>让回答能找到相关资料。</p><small>第 6–8 周</small></div>\n          <div class=\"path-arrow\"><i data-lucide=\"move-right\"></i></div>\n          <div class=\"path-phase path-finish\"><span>阶段 04 · 交付</span><strong>智能体与部署</strong><p>让工具完成连续任务并运行。</p><small>第 9–12 周</small></div>\n        </div>\n        <div class=\"path-result\"><i data-lucide=\"package-check\"></i><span>课程目标：完成项目原型、测试记录和运行说明。</span></div>"
    },
    {
      "title": "让下一步，适合你自己",
      "chapter": "继续成长",
      "time": "86:00–90:00",
      "html": "<div class=\"closing-scene\">\n        <div class=\"closing-copy\"><p class=\"small-label\">免费课程适配评估</p><h2>让下一步，<em>适合你自己</em></h2><p class=\"closing-lead\">你的基础、目标和可投入时间不同，学习路径也可以不同。</p>\n          <div class=\"closing-steps\"><div><span>01</span><strong>说说你想解决什么</strong></div><div><span>02</span><strong>看看从哪里开始更合适</strong></div><div><span>03</span><strong>预约一次免费课程咨询</strong></div></div>\n          <p class=\"closing-prompt\">课后找讲师登记，我们一起做学习适配评估。</p>\n        </div>\n        <div class=\"closing-mark\"><img src=\"assets/kqai-logo.png\" alt=\"鲲穹 AI\"><span>鲲穹 AI 课堂</span><small>求职助手试听体验</small></div>\n      </div>"
    }
  ]
};
