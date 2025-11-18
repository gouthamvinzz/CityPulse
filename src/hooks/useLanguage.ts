import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { setLanguage } from '../redux/slices/languageSlice';
import { SupportedLanguage } from '../types';
import { applyRTL } from '../utils/rtl';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const { current, isRTL } = useAppSelector(state => state.language);
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    async (lang: SupportedLanguage) => {
      await i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
      applyRTL(lang === 'ar');
    },
    [dispatch, i18n],
  );

  const toggleLanguage = useCallback(() => {
    const nextLanguage: SupportedLanguage = current === 'en' ? 'ar' : 'en';
    return changeLanguage(nextLanguage);
  }, [changeLanguage, current]);

  const applyLanguageSettings = useCallback(() => {
    i18n.changeLanguage(current);
    applyRTL(isRTL);
  }, [current, i18n, isRTL]);

  return {
    currentLanguage: current,
    isRTL,
    changeLanguage,
    toggleLanguage,
    applyLanguageSettings,
  };
};

