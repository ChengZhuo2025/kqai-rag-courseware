(function () {
  'use strict';
  const C = window.CourseCore;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const icon = name => `<i data-lucide="${name}"></i>`;
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const source = (id, label = '打开原文', highlight = '') => `<button class="source-link" data-source="${id}" data-highlight="${escape(highlight)}">${icon('file-search')}${label}${icon('arrow-up-right')}</button>`;
  const head = (title, subtitle, type = '教学模拟') => `<div class="page-tag">${icon('bookmark')} ${type}</div><div class="slide-head"><div class="section-line"></div><h2>${title}</h2>${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}</div>`;
  const stop = text => `<div class="live-stop">${icon('monitor-play')}<span><strong>现场操作</strong>　${text}</span></div>`;
  const fallback = `<div class="scene-fallback" aria-hidden="true"><div class="paper-object old-paper"><small>历史资料</small><strong>旧版 1.3</strong><div class="paper-lines"></div></div><div class="paper-object"><small>现行 · 版本 2.1</small><strong>退货政策</strong><b>7</b><small>个自然日内申请</small><div class="paper-lines"></div></div><div class="paper-object index-paper"><small>来源可追溯</small><strong>一条原文证据</strong></div></div>`;
  const space = (name, caption = '文件与索引 · 概念可视化') => `<div class="scene-host" data-scene="${name}">${fallback}<div class="scene-caption"><span>${caption}</span><strong>证据始终有来源</strong></div></div>`;
  const questions = [
    { letter: 'A', type: '有明确答案', question: '收货第 5 天，商品未使用且包装配件完整，现在不想要了，可以申请退货吗？', evidence: '现行版 2.1 规定：第 7 个自然日 24:00 前可申请，商品须未使用且商品、配件、赠品和包装基本完整。', answer: '可以申请。非质量原因寄回运费通常由消费者承担；商品页面另有明确承诺的除外。最终商品状态仍需客服核验。', source: 'faq', highlight: '## 1.' },
    { letter: 'B', type: '新旧版本冲突', question: '收货第 10 天，商品没拆封，还能按 15 天无理由退货吗？', evidence: '旧版 1.3 最后有效日为 2026-09-30；现行版 2.1 的申请期限至第 7 个自然日 24:00。', answer: '不能按旧版 15 天规则承诺。第 10 天已超出现行申请期；其他适用情形可联系人工客服核验。', source: 'faq', highlight: '## 2.' },
    { letter: 'C', type: '资料没有答案', question: '节假日预约上门取件的运费补贴是多少？', evidence: 'FAQ 第 5 条明确：现有模拟资料没有写明节假日上门取件的补贴金额。', answer: '资料未写明金额，不能猜测。应核对订单页面或转人工专员确认。', source: 'faq', highlight: '## 5.' }
  ];
  const titles = ['企业私有知识库 RAG 实战', '今天怎么学', '一条完整的数据链路', 'RAG：先检索，再生成', '三份资料，三种线索', '导入之后，检查片段', '相关度，不能决定政策效力', '资料在哪，模型在哪？', '在 Cherry Studio 中运行', '三种问题，三种判定', '让每一句答案，都有依据', '答错时，沿链路定位', '这一次，由你选择证据', '学员实操与讲评', '找证据，看版本，核引用'];
  const times = ['0:30', '1:00', '0:30', '1:30', '1:00', '1:30', '2:00', '2:30', '2:30', '4:00', '2:00', '2:00', '4:00', '15:00', '含在讲评时段'];
  const stepLabels = [
    ['从问题开始'], ['选择一段学习路线'], ['先准备资料', '入库：整理文件与索引', '问答：检索证据并生成', '核验：回到原文与版本'],
    ['像开卷查资料一样', 'R · 找出相关资料', 'A · 放入回答上下文', 'G · 根据证据组织回答'],
    ['点击文件，查看完整资料'], ['三个文件均已就绪', '拆开长文档', '发现规则与版本分离', '检查状态、日期与规则'],
    ['先看候选，不急着下结论', '相关内容按记录顺序出现', '核对旧版的失效状态', '再看现行规则'],
    ['入库：从本机文件开始', '文件文本送往嵌入模型', '向量返回本机', '在本机建立索引', '提问生成查询向量', '本机检索候选片段', '问题与片段送云端重排', '问题与上下文送对话模型', '答案回到应用，打开来源核验'],
    ['准备切换真实应用', '确认模型与知识库', '确认助手关联', '新对话中输入问题', '打开引用核验'],
    ['先判断，再看依据', '展开支持答案的证据', '揭示参考结论'], ['点击一句，检查支持关系', '先核对期限', '再核对版本', '识别没有依据的承诺'],
    ['选择一个可观察的症状', '定位待检查环节', '只改一项，再用同题复测'], ['先选证据，暂不看答案', '检查是否覆盖两项事实', '回到问题，形成结论'],
    ['10 分钟操作 + 5 分钟讲评'], ['记住这三步', '没有依据的金额，不猜']
  ];
  const section = (index, body, cls = '') => `<section data-page="${index}" class="${cls}" aria-label="第 ${index + 1} 页：${titles[index]}">${body}</section>`;
  const templates = [
    section(0, `<div class="hero-layout"><div class="hero-copy"><div class="section-line"></div><p class="course-name">企业私有知识库</p><h1><em>RAG</em> 实战</h1><p class="hero-subtitle">从搭建部署到回答校验</p><p class="hero-description">把一叠售后文件，变成回答有据可查的知识库。<br>一起走完从资料到证据的全过程。</p><button class="primary-button" data-go="1">进入证据实验台 ${icon('arrow-right')}</button></div><div class="hero-stage">${space('hero')}</div></div><div class="hero-question"><span class="question-mark">?</span><span>收货第 <strong class="orange">10</strong> 天，还能按 <strong class="orange">15</strong> 天政策退货吗？</span><span class="question-meta">零编程基础 · 25 分钟试讲 + 15 分钟实操</span></div>`, 'hero-slide'),
    section(1, head('今天，我们走完这三段。', '从看懂资料，到亲手核验一条答案。') + `<div class="route-grid"><button class="route-stop" data-go="2"><div class="route-time"><b>8</b><span>分钟</span></div><h3>搭建与检索</h3><p>看见模型拿到的原文片段</p>${icon('arrow-up-right')}</button><button class="route-stop" data-go="7"><div class="route-time"><b>5</b><span>分钟</span></div><h3>本机与云端</h3><p>说清资料和模型的位置</p>${icon('arrow-up-right')}</button><button class="route-stop" data-go="9"><div class="route-time"><b>12</b><span>分钟</span></div><h3>回答校验与带练</h3><p>处理答案、冲突与资料空白</p>${icon('arrow-up-right')}</button></div><div class="route-extension"><strong>再用 15 分钟，独立完成三道题。</strong><span>10 分钟操作 / 5 分钟讲评与提问</span></div><div class="slide-bottom"><div class="callout">${icon('scan-line')}判断标准：每个关键结论，都能回到原文。</div></div>`),
    section(2, head('一条资料，如何走到答案？', '知识库找资料，模型组织回答，人核对版本与业务结论。') + `<div class="flow-phase" aria-live="polite"><strong id="flow-phase-label">准备资料</strong><span id="flow-phase-detail">先确认来源、状态与日期。</span></div><div class="flow-stage"><div class="flow-node" data-flow="0">${icon('files')}<h3>准备资料</h3><p>来源、状态、日期</p></div><span class="flow-connector">${icon('arrow-right')}</span><div class="flow-node" data-flow="1">${icon('database')}<h3>建立索引</h3><p>导入、分片、向量化</p></div><span class="flow-connector">${icon('arrow-right')}</span><div class="flow-node" data-flow="2">${icon('search')}<h3>检索证据</h3><p>按问题寻找相关片段</p></div><span class="flow-connector">${icon('arrow-right')}</span><div class="flow-node" data-flow="3">${icon('messages-square')}<h3>组织回答</h3><p>问题 + 选用的上下文</p></div><span class="flow-connector">${icon('arrow-right')}</span><div class="flow-node" data-flow="4">${icon('badge-check')}<h3>人工核验</h3><p>版本、原句、结论</p></div></div><div class="roles"><span><strong>知识库</strong> 找资料</span><span><strong>大模型</strong> 读资料并组织语言</span><span><strong>人</strong> 核版本与业务结论</span></div><div class="slide-bottom" data-reveal="3"><div class="callout">${icon('git-compare-arrows')}每一个结论，都有一条可以回看的证据线。</div></div>`),
    section(3, head('RAG：让证据，走进答案。', '一次开卷查资料：检索 → 组装上下文 → 依据资料生成。') + `<div class="rag-question">${icon('message-circle-question')}<span>收货第 10 天，还能按旧版 15 天规则退货吗？</span><span class="rag-demo-label">教学概念演示</span></div><div class="rag-theatre" id="rag-theatre"><div class="rag-column rag-retrieval"><div class="rag-column-title"><b>R</b><div><h3>检索相关资料</h3><span>Retrieval</span></div></div><div class="rag-illustration"><img src="assets/rag-retrieval.png" alt="资料员从资料柜查找文档" width="390" height="290"><span class="rag-scan" aria-hidden="true"></span><span class="rag-scene-label">从资料库中找出候选片段</span></div><div class="rag-snippet-stack" data-reveal="1"><div class="rag-snippet historical">${icon('file-clock')}<span>旧版 1.3：15 日</span><b>已废止</b></div><div class="rag-snippet current">${icon('file-check-2')}<span>现行 2.1：7 日</span><b>现行</b></div></div></div><div class="rag-column rag-context"><div class="rag-column-title"><b>A</b><div><h3>增强回答上下文</h3><span>Augmented</span></div></div><div class="rag-illustration"><img src="assets/rag-context.png" alt="文档摘录汇入问题与上下文" width="380" height="277"><span class="rag-scene-label">选用片段与问题组合成上下文</span></div><div class="rag-context-sheet" data-reveal="2"><span class="rag-sheet-title">${icon('layers')}交给模型的上下文</span><p><b>问题</b>第 10 天可按 15 天退货吗？</p><p><b>证据 01</b>旧版已废止，9 月 30 日失效。</p><p><b>证据 02</b>现行申请期至第 7 日 24:00。</p><small>保留来源、版本与日期</small></div></div><div class="rag-column rag-generation"><div class="rag-column-title"><b>G</b><div><h3>依据证据组织回答</h3><span>Generation</span></div></div><div class="rag-illustration"><img src="assets/rag-generation.png" alt="客服阅读资料并组织回答" width="414" height="278"><span class="rag-scene-label">生成后，仍要逐项核验</span></div><div class="rag-answer" data-reveal="3"><span class="rag-sheet-title">${icon('messages-square')}有依据的参考回答</span><p>不能按旧版 15 天规则承诺。<br>第 10 天已超出现行申请期。</p><div class="rag-citations">${source('old','[1] 旧版状态','失效日期：2026-09-30')}${source('current','[2] 现行期限','第 7 个自然日 24:00')}</div></div></div><svg class="rag-paths" viewBox="0 0 1540 470" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="rag-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#1263c6"/></marker></defs><path class="rag-track" data-rag-phase="2" d="M420 305 C500 305 505 350 580 350" marker-end="url(#rag-arrow)"/><path class="rag-track" data-rag-phase="3" d="M947 350 C1025 350 1020 305 1100 305" marker-end="url(#rag-arrow)"/><path class="rag-return" data-rag-phase="3" d="M1275 422 C1275 482 230 482 230 422"/></svg><div class="rag-flying-card" aria-hidden="true">${icon('file-text')}选用片段 + 来源</div></div><div class="rag-footer"><span id="rag-status">先提出问题，再逐步找到支持回答的证据。</span><strong>${icon('undo-2')}引用回连原文，核对版本</strong></div>`),
    section(4, head('三份资料，三种线索。', '我们故意把历史文件留在知识库中，让版本冲突可以被看见。') + `<div class="document-table"><button class="document-row" data-source="current"><div class="document-name">${icon('file-check-2')}<div>现行退货政策 <span class="version">2.1</span><small>2026-10-01 生效</small></div></div><span class="pill">现行</span><p><strong class="teal">7 日</strong>无理由退货<br>质量问题 <strong>30 天</strong>内申请</p>${icon('arrow-up-right')}</button><button class="document-row" data-source="old"><div class="document-name">${icon('file-clock')}<div>旧版退货政策 <span class="version">1.3</span><small>最后有效日 2026-09-30</small></div></div><span class="pill orange">已废止 · 历史查阅</span><p>历史上曾为 <strong class="orange">15 日</strong><br>质量问题 <strong>60 天</strong>内申请</p>${icon('arrow-up-right')}</button><button class="document-row" data-source="faq"><div class="document-name">${icon('messages-square')}<div>客服常见问答 <span class="version">FAQ</span><small>五条教学问答</small></div></div><span class="pill neutral">含资料空白</span><p>有标准答案<br>也有明确“未写明”的金额</p>${icon('arrow-up-right')}</button></div><div class="slide-bottom"><div class="callout orange">${icon('history')}旧文件仍可能被检索到。判断效力，要看状态、日期和替代关系。</div></div>`),
    section(5, head('导入之后，还要检查片段。', '文件显示“就绪”，只是核验的开始。') + `<div class="chunk-workbench" id="chunk-workbench"><div class="long-document"><div class="doc-title-row"><h3>旧版退货政策</h3><span class="pill orange">1.3</span></div><div class="metadata">状态：已废止，仅供历史查阅<br>最后有效日：2026-09-30</div><p>在本版本有效期间，消费者签收普通商品后 <strong class="orange">15 个自然日内</strong>，可申请无理由退货。</p></div><div class="split-arrow" data-reveal="1">${icon('scissors')}</div><div class="chunks"><div class="chunk" data-reveal="1"><span class="small-label">片段 A · 版本信息</span>旧版 1.3，已废止。<br>最后有效日 2026-09-30。</div><div class="chunk warning" data-chunk="bad" data-reveal="2"><span class="small-label">片段 B · 若只召回这一段</span>在本版本有效期间，签收后 15 个自然日内可申请。<br><strong class="orange">当前是否有效？这一段看不全。</strong></div><div class="chunk good" data-chunk="good" data-reveal="3"><span class="pill">检查后 · 状态与规则可同时读取</span><p>旧版 1.3 已废止，2026-09-30 后不再适用。历史规则为 15 日，当前承诺应核对现行版。</p><span class="small-label">教学性重述 · 原文可从来源打开</span></div></div></div><div class="chunk-comparison" data-reveal="3"><strong>切片对照 · 教学示意</strong><span>过碎：状态丢失</span><span>过大：混入无关内容</span><span>适当：规则与必要上下文可读</span><small>没有通用固定长度，需用真实召回测试。</small></div><div class="file-ready"><span>${icon('circle-check')} 现行政策就绪</span><span>${icon('circle-check')} 旧版政策就绪</span><span>${icon('circle-check')} FAQ 就绪</span></div><div class="slide-bottom">${stop('切到 Cherry Studio，检查三份文件与版本说明。')}</div>`),
    section(6, head('相关度，不能决定政策效力。', '先看模型拿到了什么，再判断哪些证据可以用于当前回答。', '排练记录') + `<div class="question-strip">${icon('search')}<span>${questions[1].question}</span><button class="icon-button" data-copy="1" aria-label="复制冲突问题">${icon('copy')}</button></div><div class="retrieval-list"><button class="retrieval-row" data-source="faq" data-highlight="## 2." data-reveal="1"><span class="rank">01</span><div><h3>FAQ 第 2 条</h3><p>解释旧版失效与现行申请期</p></div><strong class="score">100<span style="font-size:.5em">%</span></strong>${icon('chevron-right')}</button><button class="retrieval-row" id="old-result" data-source="old" data-highlight="失效日期：2026-09-30" data-reveal="1"><span class="rank">02</span><div><h3>旧政策历史规则 <span class="pill orange" data-reveal="2">1.3 · 已废止</span></h3><p id="old-result-text">历史上曾为 15 天</p></div><strong class="score">85<span style="font-size:.5em">%</span></strong>${icon('chevron-right')}</button><button class="retrieval-row" id="current-result" data-source="current" data-highlight="第 7 个自然日 24:00" data-reveal="1"><span class="rank">03</span><div><h3>现行政策七日规则 <span class="pill" data-reveal="3">2.1 · 现行</span></h3><p>第 7 个自然日 24:00 前提出申请</p></div><strong class="score">84<span style="font-size:.5em">%</span></strong>${icon('chevron-right')}</button></div><p class="retrieval-caption">2026-11-19 本机排练记录，非实时结果。仅展示六个候选中的前三条；相关度不等于准确率。</p><div class="retrieval-process"><strong>召回</strong> 找候选 <span>→</span> <strong>重排</strong> 比较相关性 <span>→</span> <strong>人工</strong> 核版本与效力</div><div class="slide-bottom">${stop('打开 Cherry Studio 召回测试，展开真实片段及文件来源。')}</div>`),
    section(7, head('资料在哪，模型在哪？', '看清本机保留什么，以及哪些内容会发往外部模型。', '数据流概念图') + `<div class="boundary-top"><div class="segmented" aria-label="数据流阶段"><button data-boundary="ingest" class="active">资料入库</button><button data-boundary="query">一次问答</button></div><span class="boundary-step" id="boundary-step">逐步播放，跨边界内容始终可见</span></div><div class="boundary-diagram"><div class="boundary-lane"><div class="lane-title">${icon('laptop')} Mac 本机</div><div class="local-objects"><div class="data-node" id="local-file">${icon('files')}<h3>教学文件</h3><p>原文与版本信息</p></div><div class="data-node" id="local-index">${icon('database')}<h3>知识库索引</h3><p>向量与来源元数据</p></div></div><div class="app-node" id="local-app">${icon('panel-top')} Cherry Studio 桌面应用</div></div><div class="boundary-lane cloud-lane"><div class="lane-title">${icon('cloud')} 硅基流动 · 外部模型</div><div class="models"><div class="model-node" id="cloud-embed">${icon('binary')}<div><h3>BGE M3</h3><small>嵌入：文本转为向量</small></div></div><div class="model-node" id="cloud-rerank">${icon('list-filter')}<div><h3>BGE Reranker v2 M3</h3><small>重排：比较问题与候选片段</small></div></div><div class="model-node" id="cloud-chat">${icon('messages-square')}<div><h3>DeepSeek V3.2</h3><small>对话：依据问题与上下文生成回答</small></div></div></div></div><div class="transfer-bridge" aria-hidden="true"><div class="transfer-line"></div><span class="transfer-packet" id="transfer-packet">文件文本</span></div></div><div class="transfer-narration"><span class="number" id="transfer-number">00</span><p id="transfer-description">本机运行应用、保存文件并管理索引；当前配置的三个模型均在云端。</p></div><div class="boundary-disclosure">${icon('shield-check')}演示仅用虚构资料；真实数据先审查授权与供应商政策。当前不使用本地嵌入模型。</div>`),
    section(8, head('在 Cherry Studio 中，完成一次问答。', '现在切换真实应用，走完从问题到来源的闭环。') + `<div class="operation-layout"><div class="operation-steps">${[['确认模型与知识库','对话、嵌入、重排可用；三个文件就绪'],['核对助手关联','默认助手关联“复试演示_售后政策知识库”'],['新建对话并输入问题','逐题提问，观察回答与引用'],['打开引用，核对原文','读取来源、版本和支持结论的原句']].map((x,i)=>`<div class="operation-row" data-operation="${i+1}"><span class="operation-number">0${i+1}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></div>`).join('')}</div><div class="demo-launch">${icon('monitor-play')}<span class="pill">现场真实操作</span><h3>先看这一题</h3><p>${questions[0].question}</p><button class="secondary-button copy-question" data-copy="0">${icon('copy')}复制完整问题</button><p class="small-label">网页保留讲解位置，切回后可以继续。模型实际输出以 Cherry Studio 为准。</p></div></div>`),
    section(9, head('三种问题，三种判定。', '先邀请学员作判断，再展开依据与参考结论。', '预设教学案例') + `<div class="case-tabs" role="tablist" aria-label="选择教学问题">${questions.map((q,i)=>`<button class="case-tab ${i===0?'active':''}" role="tab" aria-selected="${i===0}" aria-controls="case-panel" id="case-tab-${i}" data-question="${i}"><b>${q.letter}</b>${q.type}</button>`).join('')}</div><div id="case-panel" class="case-layout" role="tabpanel" aria-labelledby="case-tab-0"><div class="case-question"><span class="big-letter" id="case-letter">A</span><blockquote id="case-question"></blockquote><button class="text-button copy-question" id="case-copy" data-copy="0">${icon('copy')}复制问题，到真实应用演示</button></div><div class="case-evidence"><p class="answer-placeholder">这道题，你会怎么回答？<br>继续下一步，检查依据。</p><div class="evidence-box" data-reveal="1"><h3>先看依据</h3><p id="case-evidence"></p><div id="case-source"></div></div><div class="evidence-box answer-box" data-reveal="2"><h3>参考判定</h3><p id="case-answer"></p></div></div></div><div class="case-footer"><span>每题分别揭示，不把三题混成一次提问。</span><span>预设答案 · 教学模拟</span></div>`),
    section(10, head('让每一句答案，都有依据。', '点击左侧主张，检查右侧原文是否直接支持。', '教学核验演示') + `<div class="verification"><div class="claim-list"><button class="claim selected" data-claim="0"><small>主张 01 · 申请期限</small>第 7 个自然日 24:00 前可申请。<span class="claim-status">待核验</span></button><button class="claim" data-claim="1"><small>主张 02 · 版本状态</small>旧版 1.3 已失效。<span class="claim-status">待核验</span></button><button class="claim unsupported" data-claim="2"><small>主张 03 · 错误示例</small>满足条件就一定批准。<span class="claim-status">待核验</span></button></div><svg class="evidence-thread" viewBox="0 0 130 440" aria-hidden="true"><path id="claim-path" d="M0 65 C65 65 65 150 130 150"/></svg><div class="verification-source" id="verification-source"></div></div><p class="verification-hint" id="verification-hint">先找到支持的原句，再检查日期、条件与结论的范围。</p>`),
    section(11, head('答错时，沿链路定位。', '每次只改一个有依据的因素，再用同一批 A/B/C 题复测。', '预设故障与模拟修正') + `<div class="symptoms" aria-label="选择错误症状"><button data-symptom="0" class="active">找不到资料</button><button data-symptom="1">召回了旧版</button><button data-symptom="2">证据对，回答越界</button></div><div class="diagnosis-chain">${['原文件','解析与分片','召回片段','版本信息','回答规则','引用核验'].map((x,i)=>`<div class="diagnosis-station" data-station="${i}"><span>0${i+1}</span><h3>${x}</h3></div>`).join('')}</div><div class="regression-flow" aria-label="迷你回归集复测步骤"><span class="active" data-regression="0">同一批 A / B / C 题</span><span data-regression="1">改一项</span><span data-regression="2">对照结论 / 版本 / 引用</span></div><div class="diagnosis-detail"><div data-reveal="1"><h3 class="orange">先检查什么？</h3><p id="diagnosis-check"></p></div><div data-reveal="2"><h3 class="teal">一项修正，再看同题结果</h3><p id="diagnosis-fix"></p></div></div><div class="slide-bottom"><div class="callout">${icon('repeat-2')}记录结论、版本和引用的变化。网页中的对照为教学模拟，真实结果要实际复测。</div></div>`),
    section(12, head('这一次，由你选择证据。', '哪项原文，能够支持“不能按旧 15 天规则承诺”？', '课堂带练') + `<p class="practice-question">${questions[1].question}</p><div class="evidence-options">${[['old','旧版 1.3 的版本信息','已废止；最后有效日为 2026-09-30。'],['current','现行版 2.1 的七日规则','第 7 个自然日 24:00 前提出申请。'],['faq','FAQ 第 2 条','同时说明旧版失效和现行七日申请期。'],['freight','现行版的寄回运费规则','非质量原因的寄回运费通常由消费者承担。']].map(([id,title,text])=>`<button class="evidence-option" data-evidence="${id}" aria-pressed="false"><span class="checkbox-visual">${icon('check')}</span><span><h3>${title}</h3><p>${text}</p></span></button>`).join('')}</div><div class="coverage"><span id="coverage-old">${icon('circle')}旧版是否失效</span><span id="coverage-current">${icon('circle')}现行申请期</span><button class="primary-button" id="check-evidence">核验证据 ${icon('scan-line')}</button></div><p class="evidence-feedback" id="evidence-feedback">先选择依据。可以选政策原文，也可以选覆盖相同事实的 FAQ。</p><div class="practice-result" data-reveal="2">不能按旧版 15 天规则承诺；第 10 天已超出现行申请期限。其他适用情形需人工核验。</div>`),
    section(13, head('接下来，交给你。', '10 分钟操作，5 分钟讲评与提问。') + `<div class="workshop-layout"><div class="timer-panel"><span class="pill">由讲师手动开始</span><div class="timer-display" id="timer-display" role="timer" aria-label="剩余时间">15:00</div><div class="timer-controls"><button class="primary-button" id="timer-toggle">${icon('play')}开始计时</button><button class="secondary-button" id="timer-reset">${icon('rotate-ccw')}复位</button></div><div class="timer-phases"><div class="timer-phase active" id="timer-phase-practice"><strong>学员操作</strong><span>0–10 分钟</span></div><div class="timer-phase" id="timer-phase-review"><strong>讲评与提问</strong><span>10–15 分钟</span></div></div><p class="small-label" id="timer-message" style="margin-top:20px">倒计时不会自动换页，可随时暂停。</p></div><div><div class="workshop-questions">${questions.map((q,i)=>`<div class="workshop-question"><b>${q.letter}</b><p>${q.question}</p><button class="icon-button" data-copy="${i}" aria-label="复制问题${q.letter}">${icon('copy')}</button></div>`).join('')}</div><div class="workshop-checklist"><strong>为每题留下三条记录</strong><span>来源文件　/　版本状态　/　支持结论的原句</span></div><div class="workshop-score"><span>共 <strong>9</strong> 分，至少 <strong>7</strong> 分<br><small>且无编造金额或旧政策承诺</small></span><button class="secondary-button" id="answers-button">参考答案 ${icon('eye')}</button></div></div></div>`),
    section(14, `<div class="final-layout"><div><div class="section-line"></div><h2 class="final-words"><span>找<em>证据</em>，</span><span>看<em>版本</em>，</span><span>核<em>引用</em>。</span></h2><p class="final-note" data-reveal="1">没有依据的金额，不猜。</p><p class="final-reminder" data-reveal="1"><strong>上线提醒</strong> 检索前控制谁能看哪些资料；用固定题集持续评测。</p><div class="final-discuss">${icon('messages-square')}提问与讨论</div></div><div class="final-evidence"><div class="final-orbit"></div><div class="final-orbit"></div><div class="final-orbit"></div><div class="final-seal">${icon('badge-check')}</div><span class="orbit-word">原文</span><span class="orbit-word">现行版本</span><span class="orbit-word">有据可查</span></div></div><div class="slide-bottom"><div class="live-stop">本课全部为教学模拟资料。把今天的方法，带到下一次知识库问答中。</div></div>`)
  ];
  $('#slides').innerHTML = templates.join('');
  let state = C.createState();
  state.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeTimeline = null;
  let activeClaim = 0;
  let deck;
  let sourceFocus;
  let toastTimeout;
  let timer = { remaining: 900, deadline: null, running: false, reviewNotified: false, endNotified: false };
  const slides = $$('#slides>section');
  const media = window.matchMedia('(max-width:700px)');
  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionOverridden = false;
  const diagnosis = [
    { stations: [0,1,2], check: '确认原文是否存在、导入是否完整，再看分片和召回。不能仅凭“没有答案”判断模型不行。', fix: '模拟修正：补全漏导入的文件，重新索引，再用原题检查能否打开来源片段。' },
    { stations: [2,3], check: '确认“已废止”、日期与替代关系是否能和规则一起被读取。旧版被召回本身不等于系统出错。', fix: '模拟修正：补足片段的版本信息，再用 B 题核验：旧版仍可能出现，但不能用它作当前承诺。' },
    { stations: [4,5], check: '原文说“可以申请”，回答却说“一定批准”。检查提示规则及每句主张是否得到引用支持。', fix: '模拟修正：加入“不扩大证据支持范围”的回答要求。将“一定批准”改为“可以申请，最终商品状态仍需客服核验”，再复测 A/B/C。' }
  ];
  const transfers = [
    { text:'本机运行应用、保存文件并管理索引；当前配置的三个模型均在云端。', packet:'准备入库', nodes:['local-file'], reverse:false },
    { text:'入库 1：把文件文本发送到云端 BGE M3，生成文档向量。', packet:'文件文本', nodes:['local-file','cloud-embed'], reverse:false },
    { text:'入库 2：文档向量返回本机；文件内容已在上一步发往外部服务。', packet:'文档向量', nodes:['cloud-embed','local-index'], reverse:true },
    { text:'入库 3：在本机建立索引，并保留来源、版本等元数据。', packet:'本机建立索引', nodes:['local-index'], local:true },
    { text:'问答 1：问题发送到 BGE M3；生成的查询向量返回本机。', packet:'问题 / 查询向量', nodes:['local-app','cloud-embed'], reverse:false },
    { text:'问答 2：利用查询向量，在本机索引中找到候选片段。', packet:'本机检索', nodes:['local-index'], local:true },
    { text:'问答 3：问题与候选片段发送到云端重排模型；重排结果返回本机。', packet:'问题 + 候选片段', nodes:['local-index','cloud-rerank'], reverse:false },
    { text:'问答 4：问题与选用的上下文发送到 DeepSeek V3.2，组织回答。', packet:'问题 + 上下文', nodes:['local-index','cloud-chat'], reverse:false },
    { text:'问答 5：答案回到 Cherry Studio；打开来源核对原文、版本和每项结论。', packet:'答案返回应用', nodes:['cloud-chat','local-app'], reverse:true }
  ];
  function refreshIcons() {
    if (!window.lucide) return;
    window.lucide.createIcons({ attrs: { 'aria-hidden':'true' } });
    // 已生成的图标不再参与下一次替换，倒计时只更新新按钮图标。
    $$('svg[data-lucide]').forEach(el => el.removeAttribute('data-lucide'));
  }
  function toast(message) {
    $('#toast').textContent = message; $('#toast').classList.add('visible');
    clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 3800);
  }
  function openDialog(id) {
    const dialog = $(id);
    if (!dialog.open) { sourceFocus = document.activeElement; dialog.showModal(); }
  }
  function closeDialog(dialog) { dialog.close(); sourceFocus?.focus?.(); }
  function showSource(id, highlight = '') {
    const file = window.COURSE_DATA.sources[id];
    if (!file) return;
    $('#source-title').textContent = file.title;
    $('#source-status').textContent = `${file.version} · ${file.status}`;
    $('#source-filename').textContent = file.file;
    const raw = escape(file.raw);
    $('#source-content').innerHTML = highlight && file.raw.includes(highlight) ? raw.replace(escape(highlight), `<mark>${escape(highlight)}</mark>`) : raw;
    $('#source-download').href = `资料/${file.file}`;
    openDialog('#source-dialog');
    $('#source-content').scrollTop = 0;
    const mark = $('#source-content mark');
    if (mark) mark.scrollIntoView({ block:'center', behavior:'instant' });
  }
  async function copyQuestion(index) {
    const text = questions[index].question;
    try {
      await navigator.clipboard.writeText(text);
      toast(`已复制问题 ${questions[index].letter}，可粘贴到 Cherry Studio。`);
    } catch {
      $('#source-title').textContent = `复制问题 ${questions[index].letter}`;
      $('#source-status').textContent = '浏览器未允许直接复制，请选择下面的完整问题';
      $('#source-filename').textContent = '教学模拟题';
      $('#source-content').textContent = text;
      $('#source-download').hidden = true;
      openDialog('#source-dialog');
      const selection = window.getSelection(); const range = document.createRange();
      range.selectNodeContents($('#source-content')); selection.removeAllRanges(); selection.addRange(range);
    }
  }
  function updateCase() {
    const q = questions[state.question];
    $('#case-letter').textContent = q.letter;
    $('#case-question').textContent = q.question;
    $('#case-evidence').textContent = q.evidence;
    $('#case-answer').textContent = q.answer;
    $('#case-source').innerHTML = source(q.source, '对照原文', q.highlight);
    $('#case-copy').dataset.copy = String(state.question);
    $('#case-panel').setAttribute('aria-labelledby',`case-tab-${state.question}`);
    $$('.case-tab').forEach((el,i)=>{el.classList.toggle('active',i===state.question);el.setAttribute('aria-selected',String(i===state.question));el.tabIndex=i===state.question?0:-1;});
  }
  function updateClaim() {
    const details = [
      `<span class="pill">现行版 2.1 · 第 1 条</span><h3>七日无理由退货</h3><blockquote>消费者签收普通实物商品后，自签收次日零时起算，在<mark>第 7 个自然日 24:00 前提出申请</mark>的，可以申请七日无理由退货。</blockquote>${source('current','打开完整条件','第 7 个自然日 24:00')}`,
      `<span class="pill orange">旧版 1.3 · 文件信息</span><h3>核对失效日期与替代关系</h3><blockquote><mark>失效日期：2026-09-30</mark><br>替代文件：版本 2.1《现行退货政策》，自 2026-10-01 生效</blockquote>${source('old','打开旧版原文','失效日期：2026-09-30')}`,
      `<span class="pill orange">没有支持“保证批准”的原文</span><h3>申请，不等于必定批准</h3><blockquote class="missing-evidence">应改为：<br>“可以申请，最终商品状态仍需客服核验。”</blockquote>${source('faq','核对 FAQ 第 1 条','最终商品状态仍需客服核验。')}`
    ];
    $('#verification-source').innerHTML = details[activeClaim];
    $$('.claim').forEach((el,i)=>{
      el.classList.toggle('selected', i === activeClaim);
      const checked = state.steps[10] >= i + 1;
      $('.claim-status',el).textContent = checked ? (i===2?'超出依据':'原文支持'):'待核验';
    });
    $('.evidence-thread').classList.toggle('unsupported',activeClaim===2);
    $('#claim-path').setAttribute('d',`M0 ${65+activeClaim*140} C65 ${65+activeClaim*140} 65 150 130 150`);
    $('#verification-hint').textContent = activeClaim===2 ? '引用按钮只是入口。多承诺的一句话，也要单独检查。':'核验顺序：主张、来源、支持原句、版本状态与日期。';
  }
  function updateEvidence() {
    const coverage = C.evidenceCoverage(state.selected);
    $$('.evidence-option').forEach(el=>{const selected=state.selected.includes(el.dataset.evidence);el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});
    const showCoverage = state.checked || state.steps[12]>=1;
    for(const key of ['old','current']) {
      const el = $(`#coverage-${key}`); const covered=showCoverage&&coverage[key];
      el.classList.toggle('covered',covered);
      el.innerHTML = icon(covered?'circle-check':'circle') + (key==='old'?'旧版是否失效':'现行申请期');
    }
    const feedback = $('#evidence-feedback');
    feedback.classList.toggle('success',state.checked&&coverage.complete&&!coverage.irrelevant);
    if (!state.checked) feedback.textContent='先选择依据。可以选政策原文，也可以选覆盖相同事实的 FAQ。';
    else if (!state.selected.length) feedback.textContent='还没有选择依据。先打开资料，找出能够支持结论的事实。';
    else if(coverage.complete&&coverage.irrelevant) feedback.textContent='两项关键事实已覆盖，但运费条款与这个版本结论无关，请移除不相关依据。';
    else if(coverage.complete) feedback.textContent=state.selected.includes('faq')?'依据完整。FAQ 第 2 条同时覆盖两项事实；也可以回看两版政策原文。':'依据完整。旧版状态与现行期限共同解释了为什么不能按 15 天承诺。';
    else feedback.textContent=coverage.old?'已证明旧版失效，还缺少现行申请期限。':coverage.current?'已找到现行期限，还需说明旧版已失效。':'运费条款不能证明版本效力或申请期限，请重新选择。';
  }
  function layoutRagPaths() {
    const stage=$('#rag-theatre'),svg=$('.rag-paths',stage);
    const r=stage.getBoundingClientRect(),scale=stage.clientWidth/r.width;
    const box=selector=>{const q=$(selector,stage).getBoundingClientRect();return {left:(q.left-r.left)*scale,right:(q.right-r.left)*scale,top:(q.top-r.top)*scale,bottom:(q.bottom-r.top)*scale};};
    const snippets=box('.rag-snippet-stack'),context=box('.rag-context-sheet'),answer=box('.rag-answer');
    const middle=b=>(b.top+b.bottom)/2;
    const connect=(a,b)=>`M${a.right+5} ${middle(a)} C${a.right+32} ${middle(a)} ${b.left-32} ${middle(b)} ${b.left-7} ${middle(b)}`;
    svg.setAttribute('viewBox',`0 0 ${stage.clientWidth} ${stage.clientHeight}`);
    $('[data-rag-phase="2"]').setAttribute('d',connect(snippets,context));
    $('.rag-track[data-rag-phase="3"]').setAttribute('d',connect(context,answer));
    const x1=(answer.left+answer.right)/2,x2=(snippets.left+snippets.right)/2,y=stage.clientHeight+20;
    $('.rag-return',stage).setAttribute('d',`M${x1} ${answer.bottom+3} C${x1} ${y} ${x2} ${y} ${x2} ${snippets.bottom+3}`);
  }
  function updateTransfer() {
    const step = state.steps[7]; const item = transfers[step];
    $('#transfer-description').textContent=item.text;
    $('#transfer-packet').textContent=item.packet;
    $('#transfer-number').textContent=String(step).padStart(2,'0');
    $('.transfer-line').classList.toggle('reverse',!!item.reverse);
    $('.transfer-bridge').style.opacity=item.local?'0.25':'1';
    $$('.boundary-diagram .active-node').forEach(el=>el.classList.remove('active-node'));
    item.nodes.forEach(id=>$(`#${id}`).classList.add('active-node'));
    $$('[data-boundary]').forEach(el=>el.classList.toggle('active',el.dataset.boundary===(step<=3?'ingest':'query')));
    $('#boundary-step').textContent=step<=3?`资料入库 · ${Math.min(step,3)} / 3`:`一次问答 · ${step-3} / 5`;
  }
  const motionNodes = new Set();
  const entryGroups = [
    '.hero-stage,.hero-question', '.route-stop,.route-extension', '.flow-node,.roles',
    '.rag-column,.rag-question,.rag-footer', '.document-row', '.long-document,.file-ready',
    '.question-strip,.retrieval-caption', '.boundary-lane,.transfer-narration,.boundary-disclosure',
    '.operation-row,.demo-launch', '.case-tab,.case-question,.answer-placeholder',
    '.claim,.verification-source,.verification-hint', '.symptoms button,.diagnosis-station',
    '.practice-question,.evidence-option,.coverage,.evidence-feedback',
    '.timer-panel,.workshop-question,.workshop-checklist,.workshop-score',
    '.final-orbit,.final-seal,.orbit-word,.final-discuss'
  ];
  function finishMotion() {
    if (!window.gsap) return;
    if (activeTimeline) { activeTimeline.progress(1, true).kill(); activeTimeline = null; }
    for (const node of motionNodes) gsap.set(node,{clearProps:'transform,opacity,clipPath,filter,strokeDashoffset,strokeDasharray'});
    motionNodes.clear();
  }
  function syncReveals(slide) {
    const newlyVisible=[];
    for(const el of $$('[data-reveal]',slide)) {
      const visible=Number(el.dataset.reveal)<=state.steps[state.index];
      if(visible&&!el.classList.contains('is-visible')) newlyVisible.push(el);
      el.classList.toggle('is-visible',visible);el.setAttribute('aria-hidden',String(!visible));
    }
    return newlyVisible;
  }
  function playMotion(slide, newlyVisible, entrance=false) {
    if(state.reduced||state.paused||!window.gsap) return;
    const tl=gsap.timeline({defaults:{ease:'power3.out'}});activeTimeline=tl;
    const add=(nodes,from,to,at=0)=>{
      nodes=Array.isArray(nodes)?nodes:[nodes];nodes=nodes.filter(Boolean);
      if(!nodes.length)return;
      nodes.forEach(node=>motionNodes.add(node));
      tl.fromTo(nodes,from,{duration:.75,...to,immediateRender:true},at);
    };
    if(entrance) {
      const title=$('h1,h2',slide);
      add(title,{y:34,opacity:.1,clipPath:'inset(0 0 100% 0)'},{y:0,opacity:1,clipPath:'inset(0 0 0% 0)',duration:.85},0);
      add($$('.section-line',slide),{scaleX:0,transformOrigin:'left'},{scaleX:1,duration:.65},.05);
      add($$('.subtitle,.hero-subtitle,.hero-description,.course-name,.page-tag',slide),{y:18,opacity:0},{y:0,opacity:1,stagger:.08},.16);
      const groups=$$(entryGroups[state.index],slide).filter(el=>!el.closest('[data-reveal]:not(.is-visible)'));
      const depth=[1,2,3,12].includes(state.index);
      add(groups,{y:depth?48:30,x:state.index%2?34:-34,rotation:state.index===4?-1.6:0,rotationX:depth?12:0,transformPerspective:1200,opacity:0},{y:0,x:0,rotation:0,rotationX:0,opacity:1,stagger:Math.min(.1,.46/Math.max(groups.length,1)),duration:.95},.25);
      const pendingRows=$$('.operation-row:not(.active)',slide);
      if(pendingRows.length)tl.set(pendingRows,{clearProps:'opacity'},1.7);
      add($$('.slide-bottom,.case-footer,.file-ready',slide).filter(el=>!el.closest('[data-reveal]:not(.is-visible)')),{opacity:0,y:16},{opacity:1,y:0,duration:.6},.65);
      if(state.index===3) add($$('.rag-illustration img',slide),{scale:1.13,clipPath:'inset(0 0 28% 0)'},{scale:1,clipPath:'inset(0 0 0% 0)',stagger:.14,duration:1.1},.35);
      if(state.index===14) add($$('.final-words span',slide),{x:-45,opacity:.1},{x:0,opacity:1,stagger:.16,duration:.8},.08);
    }
    add(newlyVisible,{x:state.index===5?60:0,y:state.index===5?0:30,scale:.97,opacity:0},{x:0,y:0,scale:1,opacity:1,stagger:.12,duration:.8},entrance?.55:0);
    const step=state.steps[state.index];
    if(state.index===2) {
      add($$('.flow-node.is-active',slide),{y:16,scale:.94},{y:0,scale:1,duration:.7},entrance?.65:0);
      add($$('.flow-connector svg',slide),{x:-12,opacity:.15},{x:0,opacity:1,stagger:.16,duration:.45},.3);
    }
    if(state.index===3&&step>0) {
      const phase=$$('.rag-column',slide)[step-1];
      add($('.rag-illustration img',phase),{scale:1.08},{scale:1,duration:1.2},0);
      if(step===1) {
        add($('.rag-scan',slide),{y:-30,opacity:0},{y:175,opacity:.85,duration:1.1,ease:'power1.inOut'},0);
        tl.to($('.rag-scan',slide),{opacity:0,duration:.2},1.1);
        add($$('.rag-snippet',slide),{x:-55,rotation:-5,opacity:0},{x:0,rotation:0,opacity:1,stagger:.22,duration:.85},.2);
      }
      const paths=$$(`[data-rag-phase="${step}"]`,slide);
      paths.forEach(path=>{const length=path.getTotalLength();add(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:step===3?1.4:1.1,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset'},.1);});
      if(step>=2&&!media.matches) {
        const card=$('.rag-flying-card',slide);const width=$('.rag-theatre',slide).clientWidth;
        const start=step===2?0:width*.34;
        add(card,{x:start,y:0,rotation:-8,opacity:0},{x:start+width*.15,y:22,rotation:3,opacity:1,duration:.9,ease:'power2.inOut'},0);
        tl.to(card,{opacity:0,scale:.8,duration:.25},.95);
        add(step===2?$('.rag-context-sheet',slide):$('.rag-answer',slide),{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.9},.45);
      }
      if(step===3) add($$('.rag-citations button',slide),{y:12,opacity:0},{y:0,opacity:1,stagger:.18},.85);
    }
    if(state.index===7&&step>0) {
      const item=transfers[step];
      add($$('.active-node',slide),{scale:.94},{scale:1,duration:.7},0);
      if(!item.local) {
        const packet=$('#transfer-packet');const start=item.reverse?125:-125,end=-start;
        add(packet,{x:start,opacity:.15,scale:.9},{x:end,opacity:1,scale:1,duration:1.1,ease:'power2.inOut'},0);
        if(step===4||step===6)tl.to(packet,{x:start,duration:1,ease:'power2.inOut'},1.15);
        tl.to(packet,{x:0,duration:.35,ease:'power2.out'});
      }
    }
    if(state.index===8&&!entrance)add($$('.operation-row.active',slide).slice(-1),{x:-30,opacity:.4},{x:0,opacity:1,duration:.7});
    if(state.index===10) {
      const path=$('#claim-path'),length=path.getTotalLength();
      add(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.1,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset'},.1);
      if(!entrance)add($('#verification-source'),{x:34,opacity:.2},{x:0,opacity:1,duration:.7},.2);
    }
    if(state.index===11&&!entrance)add($$('.diagnosis-station.active',slide),{y:-15},{y:0,stagger:.12,duration:.6});
    if(document.hidden)tl.pause();
  }
  function render(animate=true, entrance=false) {
    finishMotion();
    const index=state.index, step=state.steps[index]; const slide=slides[index];
    document.body.classList.toggle('reduced',state.reduced);
    $('#reduced-switch').checked=state.reduced;
    if(index===5) $('#chunk-workbench').classList.toggle('good-chunk',step>=3);
    if(index===6) {
      $('#old-result').classList.toggle('old-result',step>=2);
      $('#current-result').classList.toggle('current-result',step>=3);
      $('#old-result-text').textContent=step>=2?'最后有效日 2026-09-30，当前不可据此承诺':'历史上曾为 15 天';
    }
    if(index===7) updateTransfer();
    if(index===8) $$('[data-operation]').forEach(el=>el.classList.toggle('active',Number(el.dataset.operation)<=step));
    if(index===9) updateCase();
    if(index===10) updateClaim();
    if(index===11) {
      const item=diagnosis[state.symptom];
      $$('[data-symptom]').forEach(el=>el.classList.toggle('active',Number(el.dataset.symptom)===state.symptom));
      $$('[data-station]').forEach(el=>el.classList.toggle('active',step>=1&&item.stations.includes(Number(el.dataset.station))));
      $('#diagnosis-check').textContent=item.check;$('#diagnosis-fix').textContent=item.fix;
      $$('[data-regression]',slide).forEach(el=>el.classList.toggle('active',Number(el.dataset.regression)<=step));
    }
    if(index===12) updateEvidence();
    if(index===2) {
      $$('[data-flow]').forEach(el=>{const n=Number(el.dataset.flow);el.classList.toggle('is-active',step===0?n===0:step===1?n<=1:step===2?n>=2&&n<=3:n===4);});
      const phases=[['准备资料','先确认来源、状态与日期。'],['入库','整理文件，分片并建立索引。'],['问答','按问题找候选，选用片段组织回答。'],['人工核验','回到原文，确认版本与业务结论。']];
      $('#flow-phase-label').textContent=phases[step][0];$('#flow-phase-detail').textContent=phases[step][1];
    }
    if(index===3) {
      $('#rag-theatre').dataset.phase=String(step);
      $$('[data-rag-phase]',slide).forEach(el=>el.classList.toggle('is-connected',Number(el.dataset.ragPhase)<=step));
      $$('.rag-column',slide).forEach((el,i)=>el.classList.toggle('is-current',step===i+1));
      $('#rag-status').textContent=['先提出问题，再逐步找到支持回答的证据。','R · 找到候选片段；旧文件也可能出现，相关度不等于效力。','A · 选用片段，与问题、来源和版本组合成上下文；仍须核对效力。','G · 依据资料组织回答；打开 [1] [2] 引用，回看原文与版本。'][step];
    }
    const newlyVisible=syncReveals(slide);
    if(index===3&&!media.matches)layoutRagPaths();
    $('#page-number').textContent=String(index+1).padStart(2,'0');
    $('#chapter-label').textContent=index<=6?'搭建与检索':index<=8?'本机与云端':index<=12?'回答校验':index===13?'学员实操':'收束与提问';
    $('#step-label').textContent=stepLabels[index][step]||'';
    $('#step-dots').innerHTML=Array.from({length:C.maxSteps[index]},(_,i)=>`<span class="${i<step?'done':''}"></span>`).join('');
    $('#deck-progress').style.width=`${((index+1)/15)*100}%`;
    $('#next-button span').textContent=step<C.maxSteps[index]?'下一步':index===14?'学习完成':'下一页';
    $('#next-button').disabled=index===14&&step===C.maxSteps[14];
    $('#previous-button').disabled=index===0&&step===0;
    $('#pause-button').innerHTML=icon(state.paused?'play':'pause');
    $('#pause-button').setAttribute('aria-label',state.paused?'继续动效':'暂停动效');
    $('#pause-button').setAttribute('aria-pressed',String(state.paused));
    $$('.chapter-nav button').forEach((el,i)=>el.classList.toggle('active',i===(index<=6?0:index<=8?1:2)));
    $$('.directory-item').forEach((el,i)=>el.classList.toggle('current',i===index));
    $('#announcer').textContent=`第 ${index+1} 页，${titles[index]}。${stepLabels[index][step]||''}`;
    refreshIcons();
    if(animate)playMotion(slide,newlyVisible,entrance);
    const host=$('.scene-host',slide);
    window.CourseScene?.show(host,index===0?0:step,{reduced:state.reduced,paused:state.paused});
  }
  function commit(next, animate=true) {
    const changed=state.index!==next.index;state=next;
    if(changed) deck.slide(next.index);
    render(animate,changed);
  }
  function go(index) { commit(C.navigate(state,index)); }
  function next() {
    const before=state;
    let updated=C.advance(state);
    if(before.index===10&&updated.index===10) activeClaim=Math.max(0,updated.steps[10]-1);
    commit(updated);
  }
  function previous() {
    const updated=C.back(state);
    if(updated.index===10) activeClaim=Math.max(0,updated.steps[10]-1);
    commit(updated);
  }
  function replay() {
    if(state.index===12) state={...state,selected:[],checked:false};
    if(state.index===10) activeClaim=0;
    commit(C.stepTo(state,0),false);
    playMotion(slides[state.index],[],true);
    toast('本页已回到起点。按下一步继续。');
  }
  function updateTimer() {
    if(timer.running) timer.remaining=C.timerRemaining(timer.deadline,Date.now());
    const minutes=Math.floor(timer.remaining/60), seconds=timer.remaining%60;
    $('#timer-display').textContent=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    const review=timer.remaining<=300;
    $('#timer-phase-practice').classList.toggle('active',!review);
    $('#timer-phase-review').classList.toggle('active',review);
    if(review&&!timer.reviewNotified&&timer.running) {timer.reviewNotified=true;toast('10 分钟操作结束，进入 5 分钟讲评与提问。');}
    if(timer.remaining===0&&timer.running) {timer.running=false;timer.endNotified=true;toast('15 分钟结束。可以进入收束页，或继续查看当前资料。');}
    $('#timer-message').textContent=timer.remaining===0?'时间到。不会自动换页，讲师可继续讲评。':review?'现在是讲评与提问时段。':'倒计时不会自动换页，可随时暂停。';
    $('#timer-toggle').innerHTML=icon(timer.running?'pause':'play')+(timer.running?'暂停计时':timer.remaining===0?'重新开始':'开始计时');
    refreshIcons();
  }
  function initAnswers() {
    const rubric=[
      '结论准确 1 分；条件和运费准确 1 分；未承诺必定批准且引用正确 1 分。',
      '选对现行版本 1 分；说明旧版失效 1 分；不擅自推定例外 1 分。',
      '明确未知 1 分；不编金额 1 分；给出资料明确的核实途径 1 分。'
    ];
    $('#answers-content').innerHTML=questions.map((q,i)=>`<div class="answer-rubric"><h3>${q.letter} · ${q.type}</h3><p>${q.answer}</p><p class="rubric-points">${rubric[i]}</p>${source(q.source,'核对参考来源',q.highlight)}</div>`).join('')+`<div class="callout" style="font-size:17px">9 分中至少 7 分，且无编造金额或旧政策承诺。自由文本由讲师依据原文判分。</div>`;
  }
  function setupEvents() {
    document.addEventListener('click',event=>{
      const target=event.target.closest('button,a');if(!target)return;
      if(target.dataset.go!==undefined) {const dialog=target.closest('dialog');if(dialog)closeDialog(dialog);go(Number(target.dataset.go));}
      if(target.dataset.source) {$('#source-download').hidden=false;showSource(target.dataset.source,target.dataset.highlight||'');}
      if(target.dataset.copy!==undefined) copyQuestion(Number(target.dataset.copy));
      if(target.hasAttribute('data-close')) closeDialog(target.closest('dialog'));
      if(target.dataset.question!==undefined) commit(C.selectQuestion(state,Number(target.dataset.question)),false);
      if(target.dataset.boundary) commit(C.stepTo(state,target.dataset.boundary==='ingest'?0:4));
      if(target.dataset.claim!==undefined) {activeClaim=Number(target.dataset.claim);commit(C.stepTo(state,Math.max(state.steps[10],activeClaim+1)));}
      if(target.dataset.symptom!==undefined) commit(C.stepTo({...state,symptom:Number(target.dataset.symptom)},0),false);
      if(target.dataset.evidence) {
        const id=target.dataset.evidence;
        state={...state,selected:state.selected.includes(id)?state.selected.filter(x=>x!==id):[...state.selected,id],checked:false};
        render(false);
      }
    });
    $('#next-button').onclick=next;$('#previous-button').onclick=previous;$('#replay-button').onclick=replay;
    $('#directory-button').onclick=()=>openDialog('#directory-dialog');$('#tools-button').onclick=()=>openDialog('#tools-dialog');
    $('#notes-button').onclick=()=>{const win=window.open('notes.html','rag-speaker-notes','width=1050,height=850');if(!win)toast('浏览器拦截了备注窗口，请允许本页弹出窗口。');};
    $('#pause-button').onclick=()=>{
      state={...state,paused:!state.paused};
      if(activeTimeline) activeTimeline.paused(state.paused);
      window.CourseScene?.setPaused(state.paused);
      $('#pause-button').innerHTML=icon(state.paused?'play':'pause');
      $('#pause-button').setAttribute('aria-label',state.paused?'继续动效':'暂停动效');
      $('#pause-button').setAttribute('aria-pressed',String(state.paused));refreshIcons();
    };
    $('#reduced-switch').onchange=event=>{motionOverridden=true;state={...state,reduced:event.target.checked};render(false);};
    $('#reveal-all').onclick=()=>{closeDialog($('#tools-dialog'));if(state.index===10)activeClaim=2;commit(C.stepTo(state,C.maxSteps[state.index]),false);};
    $('#fullscreen-button').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();closeDialog($('#tools-dialog'));}catch{toast('当前浏览器未允许全屏，可以使用浏览器自身的全屏功能。');}};
    $('#check-evidence').onclick=()=>{state={...state,checked:true};updateEvidence();refreshIcons();};
    $('#answers-button').onclick=()=>openDialog('#answers-dialog');
    $('#timer-toggle').onclick=()=>{if(timer.running){timer.remaining=C.timerRemaining(timer.deadline,Date.now());timer.running=false;}else{if(timer.remaining===0)timer={remaining:900,deadline:null,running:false,reviewNotified:false,endNotified:false};timer.deadline=Date.now()+timer.remaining*1000;timer.running=true;}updateTimer();};
    $('#timer-reset').onclick=()=>{timer={remaining:900,deadline:null,running:false,reviewNotified:false,endNotified:false};updateTimer();};
    $$('dialog').forEach(dialog=>{
      dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
      dialog.addEventListener('close',()=>sourceFocus?.focus?.());
    });
    document.addEventListener('keydown',event=>{
      if($('dialog[open]'))return;
      const tag=event.target.tagName;
      if(['INPUT','TEXTAREA','SELECT'].includes(tag)||event.target.isContentEditable||event.ctrlKey||event.metaKey||event.altKey)return;
      if(event.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight'].includes(event.key)){
        event.preventDefault();const direction=event.key==='ArrowRight'?1:-1;const index=(state.question+direction+3)%3;
        commit(C.selectQuestion(state,index),false);$(`[data-question="${index}"]`).focus();return;
      }
      if(event.code==='Space'&&event.target.closest('button,a'))return;
      if(event.key==='ArrowRight'||event.code==='Space'||event.key==='PageDown'){event.preventDefault();next();}
      else if(event.key==='ArrowLeft'||event.key==='PageUp'){event.preventDefault();previous();}
      else if(event.key==='Escape'){event.preventDefault();openDialog('#directory-dialog');}
      else if(event.key==='Home'){event.preventDefault();go(0);}
      else if(event.key==='End'){event.preventDefault();go(14);}
    });
    window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#\/(\d+)$/);if(match)go(Number(match[1])-1);});
    motionMedia.addEventListener('change',event=>{if(!motionOverridden){state={...state,reduced:event.matches};render(false);}});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateTimer();activeTimeline?.paused(state.paused||document.hidden);window.CourseScene?.setPaused(state.paused||document.hidden);});
  }
  async function initialize() {
    // Reveal 会在初始化时读取 URL。先保存课程的一基页码，避免事件把入口改成另一页。
    const requestedPage=location.hash.match(/^#\/(\d+)$/);
    const initialIndex=requestedPage?Number(requestedPage[1])-1:0;
    let deckReady=false;
    $('#directory-grid').innerHTML=titles.map((title,i)=>`<button class="directory-item" data-go="${i}"><b>${String(i+1).padStart(2,'0')}</b><span><strong>${title}</strong><small>${times[i]} · ${i<7?'搭建与检索':i<9?'本机与云端':i<13?'回答校验':'实操与收束'}</small></span></button>`).join('');
    initAnswers();setupEvents();
    deck = new Reveal($('.reveal'),{width:1660,height:810,margin:.015,minScale:.1,maxScale:1,center:false,controls:false,progress:false,keyboard:false,touch:false,hash:false,hashOneBasedIndex:true,respondToHashChanges:false,history:false,transition:'none',backgroundTransition:'none',autoSlide:0,embedded:true,overview:false,scrollActivationWidth:0,disableLayout:media.matches});
    deck.on('slidechanged',event=>{
      if(!deckReady)return;
      state=C.navigate(state,event.indexh);
      history.replaceState(null,'',`#/${state.index+1}`);
      render(false);
      if(media.matches) $('.slides').scrollTop=0;
    });
    await deck.initialize();
    state=C.navigate(state,initialIndex);
    deck.slide(state.index);deckReady=true;
    history.replaceState(null,'',`#/${state.index+1}`);render(false);
    window.addEventListener('resize',()=>{if(state.index===3&&!media.matches)requestAnimationFrame(layoutRagPaths);});
    media.addEventListener('change',()=>{deck.configure({disableLayout:media.matches});deck.layout();render(false);});
    window.CourseApp={getState:()=>structuredClone(state),go, next,previous, replay, showAll:()=>commit(C.stepTo(state,C.maxSteps[state.index]),false),getTimer:()=>({...timer}),titles,questions,ready:true};
    playMotion(slides[state.index],[],true);
    setInterval(()=>{if(timer.running)updateTimer();},250);
  }
  initialize().catch(error=>{console.error(error);toast('初始化未完成，请重新打开课件或使用本机启动脚本。');});
})();
