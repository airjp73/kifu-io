import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FunctionComponent<PortalProps> = ({ children }) => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement>(null);
  useEffect(() => setPortalTarget(document.body), []);

  // Portal components will generally not need to be rendered on initial page load so this is ok
  return portalTarget && createPortal(children, portalTarget);
};

export default Portal;
