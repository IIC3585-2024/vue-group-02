<template>
  <div class="body-time">
    <h1>Task {{time}}</h1>
    <div class="form-group">
      <NewTask @endTask="handleEndTask" @pauseTask="handlePauseTask" @startTask="handleStartTask"
        :subscription="subscription" :lapsed="lapsed" :time="timer" v-model:taskName="name" v-model:duration="duration"
        v-model:project="project" />
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
        <Task v-for="task in tasks" :key="task.id" :id="task.id" :project="task.project" :name="task.name"
          :duration="task.duration" @delete="handleDeleteTask" @edit="handleEditTask" />
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { tasks } from '@/lib/tasks';
import {useTaskStore} from '@/lib/db';
import { useTime } from '@/lib/time';
import NewTask from '@/components/NewTask.vue';
import Task from '@/components/Task.vue';
import PopulateButton from '@/components/PopulateButton.vue';

export default {
  components: {
    PopulateButton,
    Task,
    NewTask,
  },
  setup() {
    const db = useTaskStore();
    const tasks = ref([]);
    // const time = useTime();
    const lapsed = ref(0);
    const name = ref('');
    const project = ref('');
    const previous = ref(0);
    const duration = ref(0);
    const subscription = ref(false);
    let unsubscribe;
    const changingTask = ref(false);
    const timerOn = ref(false);
    const { time, start, stop } = useTime();

    const handleImportTasks = (event) => {
      const importedTasks = event.detail.exampleTasks;
      tasks.value = tasks.value.filter(t => !importedTasks.some(task => t.name === task.name && t.project === task.project));
      tasks.value = [...tasks.value, ...importedTasks];
      db.saveTasks(importedTasks);
    };

    const handleStartTask = (e) => {
      console.log("Comence")
      // if (timerOn.value) {
      //   alert("Ya hay una tarea en curso");
      //   return;
      // }

      // if (!changingTask.value) {
      //   if (tasks.value.some(task => task.name === e.detail.name.trim() && task.project === e.detail.project.trim())) {
      //     alert("Ya existe una tarea con ese nombre en ese proyecto");
      //     return;
      //   }
      // }

      // timerOn.value = true;
      // unsubscribe = time.subscribe(value => {
      //   lapse.value = value + previous.value;
      // });
      subscription.value = true
      start();
    };

    const terminate = () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      timerOn.value = false;
    };

    const handleEndTask = (e) => {
      tasks.value = tasks.value.filter(task => task.name !== e.detail.name || task.project !== e.detail.project);
      tasks.value = [{ id: uuidv4(), project: e.detail.project, name: e.detail.name, duration: lapsed.value }, ...tasks.value];
      db.saveTasks(tasks.value);
      lapsed.value = 0;
      previous.value = 0;
      terminate();
      name.value = '';
      project.value = '';
      changingTask.value = false;
      duration.value = 0;
    };

    const handlePauseTask = (e) => {
      previous.value = lapsed.value;
      terminate();
    };

    const handleDeleteTask = (e) => {
      tasks.value = tasks.value.filter(task => task.id !== e.detail.id);
      db.saveTasks(tasks.value);
    };

    const handleEditTask = (e) => {
      name.value = e.detail.name;
      project.value = e.detail.project;
      previous.value = e.detail.duration;
      changingTask.value = true;
      handleStartTask(e);
    };

    onMounted(async () => {
      tasks.value = await db.getTasks();
    });

    onUnmounted(() => {
      terminate();
    });

    watch([lapsed, unsubscribe], () => {
      subscription.value = !!unsubscribe;
      lapsed.value = !!lapsed.value;
    });

    return {
      tasks,
      name,
      project,
      previous,
      duration,
      timerOn,
      subscription,
      lapsed,
      handleImportTasks,
      handleStartTask,
      handleEndTask,
      handlePauseTask,
      handleDeleteTask,
      handleEditTask,
      time,
    };
  },
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
