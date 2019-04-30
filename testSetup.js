require('jest-dom/extend-expect');

// Simple mock for MutationObserver
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
