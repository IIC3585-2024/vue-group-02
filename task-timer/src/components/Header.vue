<template>
  <div class="header">
    <div>
        <h2>Bienvenido a TimeTracker </h2>
        <h3> Cantidad de Tareas: {{taskCount}} </h3>
    </div>
  </div>
</template>

<script>
    import { useTaskStore } from '@/lib/db';
    import { computed } from 'vue';

    export default {
      setup() {
        const store = useTaskStore();
        const taskCount = computed(() => store.getTasks().length);
        return {
          taskCount
        };
      },
    }
    
    
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    color: #eeeeee;
    font-weight: bold;
    font-size: 1.5em;
    }
    h3{
      font-size: 0.9em;
      opacity: 0.8;
    }
</style>