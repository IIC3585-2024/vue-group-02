<template>
  <div class="header">
    <div>
        <h2>Bienvenido a TimeTracker </h2>
        <h3> Tiempo Total: {{totalTime}} </h3>
    </div>
  </div>
</template>

<script>
    import { useTaskStore } from '@/lib/db';
    import { computed } from 'vue';
    import { formatTime } from '@/lib/utils';
    import { storeToRefs } from 'pinia'

    export default {
      setup() {
        const store = useTaskStore();
        const { tasks } = storeToRefs(store);
        // const tasks = computed(() => store.getTasks());
        const totalTime = computed(() =>
          formatTime(tasks.value.reduce((duration, task) => duration + task.duration, 0)));

        return {
          tasks,
          totalTime
        };
      }
    };
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    color: #F2F6F8;
    font-weight: bold;
    font-size: 1.5em;
  }

  h3 {
    font-size: 0.9em;
    opacity: 0.8;
    text-align: center;
  }


</style>