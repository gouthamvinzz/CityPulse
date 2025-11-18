import { useCallback, useEffect, useState } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const useBiometrics = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const { available } = resultObject;
        setIsBiometricAvailable(available);
      })
      .catch(() => setIsBiometricAvailable(false));
  }, []);

  const promptBiometric = useCallback(
    async (promptMessage: string) => {
      if (!isBiometricAvailable) {
        return false;
      }

      try {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage,
        });
        return success;
      } catch {
        return false;
      }
    },
    [isBiometricAvailable],
  );

  return {
    isBiometricAvailable,
    promptBiometric,
  };
};

