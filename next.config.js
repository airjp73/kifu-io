const withCss = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(
  withCss({
    webpack(config) {
      config.resolve.modules.push('./src');
      return config;
    },
  })
);
