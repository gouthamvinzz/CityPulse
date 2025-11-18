import React, { PropsWithChildren, useEffect } from 'react';

import { useLanguage } from '../hooks/useLanguage';

const LanguageBootstrapper = ({ children }: PropsWithChildren) => {
  const { applyLanguageSettings } = useLanguage();

  useEffect(() => {
    applyLanguageSettings();
  }, [applyLanguageSettings]);

  return <>{children}</>;
};

export default LanguageBootstrapper;

