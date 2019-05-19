import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

// Simple mock for MutationObserver
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
