import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigator from './navigation/RootNavigator';
import { persistor, store } from './redux/store';
import i18n from './i18n';
import LanguageBootstrapper from './components/LanguageBootstrapper';
import FullScreenLoader from './components/FullScreenLoader';
import { ensureFirebaseApp } from './services/firebase';

ensureFirebaseApp();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<FullScreenLoader />} persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <LanguageBootstrapper>
              <RootNavigator />
            </LanguageBootstrapper>
          </I18nextProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PersistGate>
  </Provider>
);

export default App;

