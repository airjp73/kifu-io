import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FunctionComponent = ({ children }) => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement>(null);
  useEffect(() => setPortalTarget(document.body), []);

  // Portal components will generally not need to be rendered on initial page load so this is ok
  return portalTarget && createPortal(children, portalTarget);
};

export default Portal;
