<template>
  <div class="body-time">
    <div class="form-group">
      <NewTask @endTask="handleEndTask" @pauseTask="handlePauseTask" @startTask="handleStartTask"
        :subscription="subscription" :lapsed="lapsed" :time="time" :name="name" :duration="duration" :project="project"
        @updateProject="updateProject" @updateName="updateName" />
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
import { useTaskStore } from '@/lib/db';
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
  methods: {
    updateProject(newVal) {
      this.project = newVal;
    },
    updateName(newVal) {
      this.name = newVal;
    },
  },
  setup() {
    const db = useTaskStore();
    const tasks = ref([]);
    const lapsed = ref(false);
    const name = ref('');
    const project = ref('');
    const previous = ref(0);
    const duration = ref(0);
    const subscription = ref(false);
    const changingTask = ref(false);
    const timerOn = ref(false);
    const { time, start, stop, pause } = useTime();

    const handleStartTask = (e) => {
      console.log(timerOn.value)
      if (timerOn.value) {
        alert('Ya hay una tarea en curso');
        return;
      }

      if (!changingTask.value){
        if (tasks.value.filter(task => task.name == e.name.trim() && task.project == e.project.trim()).length > 0){
          alert("Ya existe una tarea con ese nombre en ese proyecto");
          return;
        };
      }
      if (e.name.trim() === '' || e.project.trim() === '') {
        alert('Por favor, ingrese un nombre y un proyecto');
        return;
      }

      timerOn.value = true;
      subscription.value = true
      start(previous.value);
    };

    const terminate = () => {
      subscription.value = false;
      stop();
      timerOn.value = false;
      name.value = '';
      project.value = '';
    };
    
    const pauseTimer = () => {
      subscription.value = false;
      pause();
      timerOn.value = false;
    }

    function handleImportTasks(event) {
      const importedTasks = event.exampleTasks;
      importedTasks.forEach(task => {
        tasks.value = tasks.value.filter(t => t.name != task.name || t.project != task.project);
      });
      tasks.value = [ ...tasks.value, ...importedTasks]
      db.saveTasks(tasks.value);
    }

    const handleEndTask = (e) => {
      console.log('TERMINE')
      tasks.value = tasks.value.filter(task => task.name !== e.name || task.project !== e.project);

      tasks.value = [{ id: uuidv4(), project: e.project, name: e.name, duration: time.value }, ...tasks.value];
      db.saveTasks(tasks.value);
      lapsed.value = false;
      previous.value = 0;
      terminate();

      changingTask.value = false;
      duration.value = 0;
    };

    const handlePauseTask = (e) => {
      lapsed.value = true
      previous.value = time.value;    
      pauseTimer();
    };

    const handleDeleteTask = (e) => {
      tasks.value = tasks.value.filter(task => task.id !== e.id);
      db.saveTasks(tasks.value);
    };

    const handleEditTask = (e) => {
      if (timerOn.value) {
        alert('Ya hay una tarea en curso');
        return;
      }
      console.log(e)
      console.log('EDITANDO')
      name.value = e.name;
      project.value = e.project;
      previous.value = e.duration;
      changingTask.value = true;
      handleStartTask(e);
    };

    onMounted(async () => {
      tasks.value = await db.getTasks();
    });

    onUnmounted(() => {
      terminate();
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
  padding: 20px;
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
