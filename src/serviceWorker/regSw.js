/**
 * Created by akshaybindal on 09/11/17.
 */

import swURL from "file-loader?name=sw.js!./sw.js";

export const registerServiceWorker = function registerServiceWorker() {
  console.log(process.env.BROWSER);
  if (process.env.BROWSER) {
    const navigator = window.navigator;
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swURL).then(() => {
          // eslint-disable-next-line no-console
          console.log(`Service Worker Registered.`);
        }).catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`Error during service worker registration: ${e}`);
        });
    }
  } else {
    console.log('Service worker not supported'); // eslint-disable-line no-console
  }
}
