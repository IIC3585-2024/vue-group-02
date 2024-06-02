import { ref } from 'vue';

export const time = ref(0);
let interval = null;

function start() {
  if (interval) return;
  interval = setInterval(() => {
    time.value += 1;
  }, 1000);
}

function stop() {
  clearInterval(interval);
  interval = null;
}

export default {
  subscribe(callback) {
    start();
    const unsubscribe = () => {
      stop();
    };
    return unsubscribe;
  },
  time
};