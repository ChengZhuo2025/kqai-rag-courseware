(function () {
  'use strict';
  const data = window.COURSE_DATA;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const slidesRoot = $('#slides');
  const reducedPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobilePreference = window.matchMedia('(max-width: 700px)');
  let deck;
  let activeTimeline;
  let paused = false;
  let reduced = reducedPreference.matches;
  let dialogReturnFocus = null;

  slidesRoot.innerHTML = data.slides.map((slide, index) => {
    const section = document.createElement('section');
    section.className = 'deck-slide';
    section.dataset.page = String(index + 1);
    section.dataset.chapter = slide.chapter;
    section.dataset.time = slide.time;
    section.innerHTML = `<span class="page-tag"><i data-lucide="clock-3"></i>${slide.time}</span>${slide.html}`;
    section.querySelectorAll('[data-fragment-index]').forEach(node => node.classList.add('fragment'));
    return section.outerHTML;
  }).join('');

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
  }

  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('visible');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => node.classList.remove('visible'), 2600);
  }

  function currentIndex() {
    return deck ? deck.getIndices().h || 0 : 0;
  }

  function currentSlideElement() {
    return deck ? deck.getCurrentSlide() : null;
  }

  function updateHash(index) {
    const hash = `#/${index + 1}`;
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
  }

  function updateStatus() {
    if (!deck) return;
    const index = currentIndex();
    const slide = data.slides[index];
    const element = currentSlideElement();
    const fragments = element ? $$('.fragment', element) : [];
    const visible = element ? $$('.fragment.visible', element).length : 0;
    $('#page-number').textContent = String(index + 1).padStart(2, '0');
    $('#page-total').textContent = `/ ${String(data.slides.length).padStart(2, '0')}`;
    $('#chapter-label').textContent = slide.chapter;
    $('#step-label').textContent = slide.title;
    $('#step-dots').innerHTML = fragments.map((_, i) => `<span class="${i < visible ? 'done' : ''}"></span>`).join('');
    $('#deck-progress').style.width = `${((index + 1) / data.slides.length) * 100}%`;
    $('#next-button span').textContent = index === data.slides.length - 1 ? '结束体验' : visible < fragments.length ? '继续' : '下一页';
    $('#previous-button').disabled = index === 0 && visible === 0;
    $('#announcer').textContent = `第 ${index + 1} 页，共 ${data.slides.length} 页：${slide.title}`;
    $$('.chapter-nav [data-go]').forEach(button => {
      const start = Number(button.dataset.go);
      const nextStart = data.chapters.find(chapter => chapter.start > start)?.start ?? data.slides.length;
      button.classList.toggle('active', index >= start && index < nextStart);
    });
    if (window.CourseNotes) window.CourseNotes.sync();
  }

  function visibleMotionTargets(slide) {
    const selector = '.slide-head,.role-compare,.bottom-callout,.resume-app,.demo-note,.role-picker,.role-result,.rewrite-stage,.fact-guard,.build-stage,.build-result,.review-scene,.review-principle,.halfway-mark,.capability-track,.capability-caption,.agent-story,.challenge-layout,.challenge-bottom,.project-showcase,.project-note,.learning-path,.path-result,.closing-copy,.closing-mark';
    return $$(selector, slide).filter(node => !node.closest('.fragment:not(.visible)'));
  }

  function playEntrance(slide, replay = false) {
    activeTimeline?.kill();
    activeTimeline = null;
    if (!window.gsap || reduced || paused || !slide) return;
    const targets = visibleMotionTargets(slide);
    if (!targets.length) return;
    if (replay) gsap.set(targets, { clearProps: 'transform,opacity' });
    activeTimeline = gsap.timeline();
    activeTimeline.fromTo(targets, { y: 17, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.56, stagger: 0.045, ease: 'power2.out', clearProps: 'transform,opacity'
    });
  }

  function openDialog(selector) {
    const dialog = $(selector);
    if (!dialog || dialog.open) return;
    dialogReturnFocus = document.activeElement;
    dialog.showModal();
    refreshIcons();
  }

  function closeDialog(dialog) {
    if (!dialog?.open) return;
    dialog.close();
    dialogReturnFocus?.focus?.();
  }

  function go(index) {
    if (!deck) return;
    deck.slide(Math.max(0, Math.min(data.slides.length - 1, index)), 0, -1);
  }

  function next() {
    deck?.next();
  }

  function previous() {
    deck?.prev();
  }

  function resetSlideInteraction(index) {
    if (index === 2) {
      $('#demo-role').value = 'product';
      $('#demo-focus').textContent = demoExamples.product.focus;
      $('#demo-advice').textContent = demoExamples.product.advice;
      $('#demo-question').textContent = demoExamples.product.question;
      $('#demo-state').textContent = '预设样例';
      $('#demo-placeholder').hidden = true;
      $('#demo-result').hidden = false;
      $('#demo-result').classList.remove('result-pop');
    } else if (index === 3) {
      updateRoleExample('product');
    } else if (index === 5) {
      $('#build-visual').classList.remove('built');
      $('#followup-chip').hidden = true;
      $('#build-stamp').classList.remove('visible');
      $('#build-result').classList.remove('complete');
      $('#build-result').lastElementChild.textContent = '准备好需求，AI 可以协助我们把功能变成看得见的界面。';
      $('#build-preview span').textContent = '查看原型改造过程';
    } else if (index === 9) {
      $$('.challenge-option').forEach(button => {
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      });
      $('#challenge-text').textContent = '选择一条追问，看看怎样把“沟通能力”落到具体经历。';
      $('#challenge-response').classList.remove('has-answer');
    }
  }

  function replay() {
    const slide = currentSlideElement();
    if (!slide) return;
    resetSlideInteraction(currentIndex());
    deck.slide(currentIndex(), 0, -1);
    playEntrance(slide, true);
    toast('已重放本页');
  }

  function showAll() {
    const slide = currentSlideElement();
    const fragments = slide ? $$('.fragment', slide) : [];
    deck?.slide(currentIndex(), 0, fragments.length);
  }

  function setReduced(value) {
    reduced = Boolean(value);
    document.documentElement.classList.toggle('reduced-motion', reduced);
    $('#reduced-switch').checked = reduced;
    if (reduced) {
      activeTimeline?.progress(1).pause();
      const slide = currentSlideElement();
      if (slide) $$('.fragment', slide).forEach(node => node.classList.add('visible'));
      updateStatus();
    } else {
      activeTimeline?.resume();
    }
  }

  function syncNotes() {
    try {
      if (window.opener && !window.opener.closed && window.opener.CourseApp) {
        window.opener.CourseApp.getState();
      }
    } catch { /* Notes still work when opened as a standalone file. */ }
  }

  function initDirectory() {
    $('#directory-grid').innerHTML = data.slides.map((slide, index) => `<button class="directory-item" data-go="${index}"><b>${String(index + 1).padStart(2, '0')}</b><span><strong>${escapeHtml(slide.title)}</strong><small>${slide.time} · ${escapeHtml(slide.chapter)}</small></span></button>`).join('');
  }

  const roleExamples = {
    product: { title: 'AI 产品运营助理 · 面试问题', question: '你提到整理报名问题，能说说你怎样判断哪些问题值得优先回应吗？' },
    developer: { title: 'AI 应用开发实习 · 面试问题', question: '如果要把报名问题分类，你会先确定哪些输入信息和结果格式？' },
    content: { title: '新媒体运营助理 · 面试问题', question: '你整理过哪些活动反馈？它们会怎样影响下一次选题？' }
  };

  const demoExamples = {
    product: { focus: '用户反馈与活动推进', advice: '把“整理报名问题”说具体：你发现了哪些重复问题，又怎样协助团队回应？', question: '讲一个你根据报名反馈调整活动安排的例子。' },
    developer: { focus: '问题拆解与功能验证', advice: '说明你怎样记录问题、分类信息，并确认处理结果符合预期。', question: '如果报名问题很多，你会怎样设计一个分类和检索的小工具？' },
    content: { focus: '内容表达与反馈整理', advice: '补充你怎样整理读者问题，并把反馈用于下一次内容安排。', question: '你怎样判断一条活动内容是否回答了目标读者的问题？' }
  };

  function runDemo() {
    const key = $('#demo-role').value;
    const result = demoExamples[key];
    $('#demo-focus').textContent = result.focus;
    $('#demo-advice').textContent = result.advice;
    $('#demo-question').textContent = result.question;
    $('#demo-placeholder').hidden = true;
    $('#demo-result').hidden = false;
    $('#demo-state').textContent = '样例已展开';
    $('#demo-result').classList.remove('result-pop');
    void $('#demo-result').offsetWidth;
    $('#demo-result').classList.add('result-pop');
    refreshIcons();
  }

  function updateRoleExample(key) {
    const result = roleExamples[key];
    if (!result) return;
    $$('.role-choice').forEach(button => {
      const selected = button.dataset.role === key;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $('#role-result-title').textContent = result.title;
    $('#role-result-question').textContent = `“${result.question}”`;
    $('#role-result').classList.remove('result-pop');
    void $('#role-result').offsetWidth;
    $('#role-result').classList.add('result-pop');
  }

  const challengeAnswers = {
    example: '“能讲一个你用沟通解决具体问题的例子吗？你当时做了什么？”',
    result: '“你怎样判断沟通有效？有没有收到后续反馈？”',
    conflict: '“遇到意见不一致时，你怎样推进讨论并确认下一步？”'
  };

  function updateChallenge(key) {
    $$('.challenge-option').forEach(button => {
      const selected = button.dataset.challenge === key;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $('#challenge-text').textContent = challengeAnswers[key] || '选择一条追问，看看怎样把“沟通能力”落到具体经历。';
    $('#challenge-response').classList.toggle('has-answer', Boolean(challengeAnswers[key]));
  }

  function setupInteractions() {
    $('#demo-generate').addEventListener('click', runDemo);
    $('#demo-role').addEventListener('change', () => {
      if ($('#demo-result').hidden) $('#demo-state').textContent = '岗位已更新';
      else runDemo();
    });
    $$('.role-choice').forEach(button => button.addEventListener('click', () => updateRoleExample(button.dataset.role)));
    $('#build-preview').addEventListener('click', () => {
      const visual = $('#build-visual');
      const isBuilt = visual.classList.toggle('built');
      $('#followup-chip').hidden = !isBuilt;
      $('#build-stamp').classList.toggle('visible', isBuilt);
      $('#build-result').classList.toggle('complete', isBuilt);
      $('#build-result').lastElementChild.textContent = isBuilt
        ? '原型示意已增加连续追问入口。真实改造请由讲师在所选 AI 编程工具中完成。'
        : '准备好需求，AI 可以协助我们把功能变成看得见的界面。';
      $('#build-preview span').textContent = isBuilt ? '还原改造前' : '查看原型改造过程';
      refreshIcons();
    });
    $$('.challenge-option').forEach(button => button.addEventListener('click', () => updateChallenge(button.dataset.challenge)));
  }

  function setupDialogs() {
    $$('.directory-dialog [data-go]').forEach(button => button.addEventListener('click', () => {
      closeDialog($('#directory-dialog'));
      go(Number(button.dataset.go));
    }));
    $$('.chapter-nav [data-go]').forEach(button => button.addEventListener('click', () => go(Number(button.dataset.go))));
    $('#directory-button').addEventListener('click', () => openDialog('#directory-dialog'));
    $('#tools-button').addEventListener('click', () => openDialog('#tools-dialog'));
    $('#sources-button').addEventListener('click', () => openDialog('#sources-dialog'));
    $$('dialog [data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
    $$('dialog').forEach(dialog => {
      dialog.addEventListener('click', event => {
        if (event.target === dialog) closeDialog(dialog);
      });
      dialog.addEventListener('close', () => dialogReturnFocus?.focus?.());
    });
    $('#reduced-switch').addEventListener('change', event => setReduced(event.target.checked));
    $('#reveal-all').addEventListener('click', showAll);
    $('#fullscreen-button').addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch { toast('浏览器未开放全屏权限，可按 F11 或使用投影模式。'); }
    });
  }

  function setupNavigation() {
    $('#next-button').addEventListener('click', next);
    $('#previous-button').addEventListener('click', previous);
    $('#replay-button').addEventListener('click', replay);
    $('#pause-button').addEventListener('click', () => {
      paused = !paused;
      if (paused) activeTimeline?.pause(); else activeTimeline?.resume();
      $('#pause-button').innerHTML = `<i data-lucide="${paused ? 'play' : 'pause'}"></i>`;
      $('#pause-button').setAttribute('aria-label', paused ? '继续动效' : '暂停动效');
      $('#pause-button').setAttribute('title', paused ? '继续动效' : '暂停动效');
      refreshIcons();
    });
    document.addEventListener('keydown', event => {
      if ($$('dialog[open]').length) return;
      if (event.target.closest('button,a,input,select,textarea,[contenteditable="true"]')) return;
      if (event.key === 'ArrowRight' || event.code === 'Space' || event.key === 'PageDown') { event.preventDefault(); next(); }
      else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); previous(); }
      else if (event.key === 'Home') { event.preventDefault(); go(0); }
      else if (event.key === 'End') { event.preventDefault(); go(data.slides.length - 1); }
      else if (event.key === 'Escape') { event.preventDefault(); openDialog('#directory-dialog'); }
    });
    window.addEventListener('hashchange', () => {
      const match = window.location.hash.match(/^#\/(\d+)$/);
      if (match) go(Number(match[1]) - 1);
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) activeTimeline?.pause();
      else if (!paused && !reduced) activeTimeline?.resume();
    });
  }

  async function initialize() {
    initDirectory();
    setupInteractions();
    setupDialogs();
    setupNavigation();
    setReduced(reduced);

    const requested = window.location.hash.match(/^#\/(\d+)$/);
    const initialIndex = requested ? Math.max(0, Math.min(data.slides.length - 1, Number(requested[1]) - 1)) : 0;
    deck = new Reveal($('.reveal'), {
      width: 1660, height: 810, margin: 0.015, minScale: 0.08, maxScale: 1,
      center: false, controls: false, progress: false, keyboard: false, touch: false,
      hash: false, hashOneBasedIndex: true, respondToHashChanges: false, history: false,
      transition: 'none', backgroundTransition: 'none', autoSlide: 0,
      embedded: true, overview: false, scrollActivationWidth: 0,
      disableLayout: mobilePreference.matches
    });

    deck.on('slidechanged', event => {
      updateHash(event.indexh);
      updateStatus();
      playEntrance(event.currentSlide);
      if (mobilePreference.matches) $('.slides').scrollTop = 0;
    });
    deck.on('fragmentshown', event => {
      updateStatus();
      if (!reduced && !paused && window.gsap) {
        activeTimeline?.kill();
        activeTimeline = gsap.fromTo(event.fragment, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power2.out', clearProps: 'transform,opacity' });
      }
    });
    deck.on('fragmenthidden', updateStatus);
    await deck.initialize();
      deck.slide(initialIndex, 0, -1);
    updateHash(initialIndex);
    updateStatus();
    playEntrance(currentSlideElement());
    refreshIcons();

    mobilePreference.addEventListener('change', event => {
      deck.configure({ disableLayout: event.matches });
      deck.layout();
      updateStatus();
    });
    reducedPreference.addEventListener('change', event => {
      if (!$('#reduced-switch').dataset.userChanged) setReduced(event.matches);
    });
    $('#reduced-switch').addEventListener('change', () => { $('#reduced-switch').dataset.userChanged = 'true'; }, { once: true });
    window.CourseApp = {
      getState: () => ({
        index: currentIndex(),
        fragments: currentSlideElement()?.querySelectorAll('.fragment.visible').length || 0,
        totalFragments: currentSlideElement()?.querySelectorAll('.fragment').length || 0
      }),
      go, next, previous, replay, showAll, titles: data.slides.map(slide => slide.title)
    };
  }

  initialize().catch(error => {
    console.error(error);
    toast('课件初始化失败，请从本机启动脚本打开。');
  });
})();
