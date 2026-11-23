declare module 'quasar/wrappers' {
  import type { App } from 'vue';
  import type { QVueGlobals } from 'quasar';

  export function boot(
    callback: (context: { app: App }) => void | Promise<void>,
  ): (context: { app: App }) => void | Promise<void>;

  declare module 'vue' {
    interface ComponentCustomProperties {
      $q: QVueGlobals;
    }
  }
}
