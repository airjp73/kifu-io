// TODO: Would be nice to be able to control the mocked pathname?
module.exports = {
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { pathname: 'mocked-path' },
    };
    return component;
  },
};
