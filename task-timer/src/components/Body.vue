<template>
    <div class="body-time">
      <div class="form-group">
        <NewTask
          @endTask="handleEndTask"
          @pauseTask="handlePauseTask"
          @startTask="handleStartTask"
          :subscription="subscription"
          :lapsed="lapsed"
          :time="timer"
          :name="name"
          :duration="duration"
          :project="project"
        />
      </div>
      <div class="container-tasks">
        <table>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Duración</th>
            <th>------</th>
          </tr>
          <Task
            v-for="task in tasks"
            :key="task.id"
            :id="task.id"
            :project="task.project"
            :name="task.name"
            :duration="task.duration"
            @delete="handleDeleteTask"
            @edit="handleEditTask"
          />
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useTaskStore } from '@/db';
  import { v4 as uuidv4 } from 'uuid';
  import Task from './Task.vue';
  import NewTask from './NewTask.vue';
  import { tasks } from '../tasks';
  import TaskApi from '../TasksAPI';
  import { time } from '../time';
  
  export default {
    components: { Task, NewTask },
    setup() {
      const tasks = useTaskStore.getTasks();
      const lapse = ref(0);
      const name = ref('');
      const project = ref('');
      const previous = ref(0);
      const duration = ref(0);
      const changingTask = ref(false);
  
      function handleStartTask(e) {
        if (!changingTask.value) {
          if (tasks.value.some(task => task.name === e.detail.name && task.project === e.detail.project)) {
            alert("Ya existe una tarea con ese nombre en ese proyecto");
            return;
          }
        }
  
        unsubscribe = time.subscribe(value => {
          lapse.value = value + previous.value;
        });
        console.log("comenzando", e.detail);
      }
  
      function terminate() {
        if (unsubscribe) {
          unsubscribe = null;
        }
      }
  
      function handleEndTask(e) {
        console.log("terminando", lapse.value);
        tasks.value = tasks.value.filter(task => task.name !== e.detail.name || task.project !== e.detail.project);
        tasks.value.unshift({ id: uuidv4(), project: e.detail.project, name: e.detail.name, duration: lapse.value });
        TaskApi.saveTasks(tasks.value);
        lapse.value = 0;
        previous.value = 0;
        terminate();
        name.value = '';
        project.value = '';
        changingTask.value = false;
        duration.value = 0;
      }
  
      function handlePauseTask(e) {
        previous.value = lapse.value;
        terminate();
        console.log("pausando", e.detail);
      }
  
      function handleDeleteTask(e) {
        tasks.value = tasks.value.filter(task => task.id !== e.detail.id);
        TaskApi.saveTasks(tasks.value);
      }
  
      function handleEditTask(e) {
        name.value = e.detail.name;
        project.value = e.detail.project;
        previous.value = e.detail.duration;
        changingTask.value = true;
        handleStartTask(e);
        console.log("editando", e.detail);
      }
  
      onMounted(async () => {
        tasks.value = await useTaskStore.getTasks();
      });
  
      onDestroy(() => {
        terminate();
      });
  
      const subscription = computed(() => !!unsubscribe);
      const lapsed = computed(() => !!lapse.value);
      const timer = computed(() => lapse.value);
  
      return {
        tasks,
        subscription,
        lapsed,
        timer,
        name,
        project,
        duration,
        handleStartTask,
        handleEndTask,
        handlePauseTask,
        handleDeleteTask,
        handleEditTask
      };
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
  }
  .body-time {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    background: #009579;
  }
  .container-tasks {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  th {
    border: 1px dashed gray;
    padding: 10px;
  }
  table tr:first-child th {
    border-top: 0;
  }
  table tr th:first-child {
    border-left: 0;
  }
  table tr th:last-child {
    border-right: 0;
  }
  </style>
  