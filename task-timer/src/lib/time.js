import { ref, watchEffect } from 'vue';

export const time = ref(0);

export function start() {
  const beginning = new Date();
  const beginningTime = beginning.getTime();

  const intervalId = setInterval(() => {
    const current = new Date();
    const currentTime = current.getTime();
    time.value = currentTime - beginningTime;
  }, 10);
}

export function stop() {
  clearInterval(intervalId);
  time.value = 0;
}

watchEffect(() => {
  start();
  return () => {
    stop();
  };
});