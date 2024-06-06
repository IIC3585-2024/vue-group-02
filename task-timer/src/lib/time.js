import { ref, onUnmounted } from 'vue';

export function useTime() {
  const time = ref(0);
  let interval = null;

  const start = () => {
    const beginningTime = Date.now();

    interval = setInterval(() => {
      time.value = Date.now() - beginningTime;
    }, 10);
  };

  const stop = () => {
    clearInterval(interval);
    interval = null;
    time.value = 0;
  };

  onUnmounted(() => {
    stop();
  });

  return {
    time,
    start,
    stop,
  };
}
