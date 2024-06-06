<template>
  <div class="body-time">
    <div class="form-group">
      <NewTask
        @handleEndTask="handleEndTask"
        @handlePauseTask="handlePauseTask"
        @handleStartTask="handleStartTask"
        :subscription="subscription"
        :lapsed="lapsed"
        :time="timer"
        :name="name"
        :duration="duration"
        :project="project"
      />
    </div>
    <div class="populate-div">
      <PopulateButton @importTasks="handleImportTasks" />
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
          @handleDeleteTask="handleDeleteTask"
          @handleEditTask="handleEditTask"
        />
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task.vue';
import NewTask from './NewTask.vue';
import { time, start, stop } from '@/lib/time';
import PopulateButton from './PopulateButton.vue';

export default {
  components: { Task, NewTask, PopulateButton },
  setup() {
    const taskStore = useTaskStore();
    const lapse = ref(0);
    const name = ref('');
    const project = ref('');
    const previous = ref(0);
    const duration = ref(0);
    const changingTask = ref(false);
    let timerInterval;

    let unsubscribe = null;

    function handleStartTask(e) {
      if (!changingTask.value) {
        if (tasks.value.some(task => task.name === e.detail.name && task.project === e.detail.project)) {
          alert("Ya existe una tarea con ese nombre en ese proyecto");
          return;
        }
      }
      timerInterval = setInterval(() => {
        lapse.value = Date.now() - previous.value;
      }, 10);
    }

    function terminate() {
      if (unsubscribe) {
        unsubscribe = null;
      }
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function handleImportTasks(event) {
      const importedTasks = event.detail.exampleTasks;
      importedTasks.forEach(task => {
        tasks = tasks.filter(t => t.name != task.name || t.project != task.project);
      });
      tasks = [ ...tasks, ...importedTasks]
      taskStore.saveTasks(tasks);
    }

    function handleEndTask(e) {
      console.log("terminando", lapse.value);
      tasks.value = tasks.value.filter(task => task.name !== e.detail.name || task.project !== e.detail.project);
      tasks.value.unshift({ id: uuidv4(), project: e.detail.project, name: e.detail.name, duration: lapse.value });
      taskStore.saveTasks(tasks.value);
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

    const tasks = computed(() => taskStore.getTasks());
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
      handleEditTask,
      handleImportTasks
    };
  }
};
</script>

<style scoped>
  .form-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    padding: 0px 80px 0px 80px;
  }

  .body-time {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    background: #009579;
  }

  .populate-div {
    display: flex;
    justify-content: center;
    align-items: center;
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

  th{
    border: 1px  dashed gray;
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
