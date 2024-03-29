import { App, Plugin } from 'vue';
import VueClipboard from 'vue-clipboard2';
// Import vue components
import * as components from '@/lib-components/index';

const install: Exclude<Plugin['install'], undefined> = function installAccount(
  app: App
) {
  // Register Vue copy to clip board
  app.use(VueClipboard);

  //register component
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
