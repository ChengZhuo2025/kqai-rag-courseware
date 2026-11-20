(function (root) {
  'use strict';
  const maxSteps = [0, 0, 3, 3, 0, 3, 3, 8, 4, 2, 3, 2, 2, 0, 1];
  function createState() {
    return { index: 0, steps: Array(15).fill(0), question: 0, questionSteps: [0, 0, 0], symptom: 0, selected: [], checked: false, reduced: false, paused: false };
  }
  function navigate(state, index) {
    return { ...state, index: Math.max(0, Math.min(14, index)) };
  }
  function stepTo(state, step) {
    const steps = [...state.steps];
    steps[state.index] = Math.max(0, Math.min(maxSteps[state.index], step));
    const next = { ...state, steps };
    if (state.index === 9) {
      next.questionSteps = [...state.questionSteps];
      next.questionSteps[state.question] = steps[9];
    }
    return next;
  }
  function advance(state) {
    return state.steps[state.index] < maxSteps[state.index]
      ? stepTo(state, state.steps[state.index] + 1) : navigate(state, state.index + 1);
  }
  function back(state) {
    return state.steps[state.index] > 0 ? stepTo(state, state.steps[state.index] - 1) : navigate(state, state.index - 1);
  }
  function selectQuestion(state, question) {
    const next = { ...state, question: Math.max(0, Math.min(2, question)), steps: [...state.steps] };
    next.steps[9] = state.questionSteps[next.question];
    return next;
  }
  function evidenceCoverage(selected) {
    const old = selected.includes('old') || selected.includes('faq');
    const current = selected.includes('current') || selected.includes('faq');
    return { old, current, complete: old && current, irrelevant: selected.includes('freight') };
  }
  function timerRemaining(deadline, now) { return Math.max(0, Math.ceil((deadline - now) / 1000)); }
  const api = { maxSteps, createState, navigate, stepTo, advance, back, selectQuestion, evidenceCoverage, timerRemaining };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourseCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
