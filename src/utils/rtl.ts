import { I18nManager } from 'react-native';

export const applyRTL = (isRTL: boolean) => {
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
};

