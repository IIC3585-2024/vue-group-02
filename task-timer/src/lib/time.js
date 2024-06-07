import { ref, onUnmounted } from 'vue';

export function useTime() {
  const time = ref(0);
  let interval = null;

  const start = (previusTime = 0) => {
    const beginningTime = Date.now();

    interval = setInterval(() => {
      time.value = previusTime + Date.now() - beginningTime;
    }, 10);
  };

  const stop = () => {
    clearInterval(interval);
    interval = null;
    time.value = 0;
  };

  const pause = () => {
    clearInterval(interval);
    interval = null;
  };

  onUnmounted(() => {
    stop();
  });

  return {
    time,
    start,
    stop,
    pause
    
  };
}
