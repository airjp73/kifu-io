module.exports = {
  roots: [
    '<rootDir>'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(test|spec)\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'jest.tsconfig.json',
    }
  },
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    './testSetup.js'
  ],
  modulePaths: ["<rootDir>/src"],
}