/* eslint-disable no-console */
import { register } from "register-service-worker";
import Vue from "vue";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {},
    registered(worker) {
      const delay = 1000 * 60 * 5;

      setTimeout(function update() {
        worker.update();
        setTimeout(update, delay);
      }, delay);
    },
    cached() {},
    updatefound() {},
    updated(registration) {
      Vue.prototype.$reload(
        "Pembaruan aplikasi tersedia. Silakan muat ulang peramban Anda",
        {
          event: () => {
            registration.waiting.postMessage({ action: "skipWaiting" });
          }
        }
      );
    },
    offline() {},
    error() {}
  });

  if ("serviceWorker" in navigator) {
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    let refreshing;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
}
