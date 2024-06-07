<template>

  <div class="new-task">
    <input type="text" class="form-control" id="projectName" :value="project" @input="updateProject"
      placeholder="Proyecto">
    <input type="text" class="form-control" id="projectDescription" :value="name" @input="updateName"
      placeholder="Nombre">
    <div class="controls">
      <template v-if="subscription">
        <button class="btn btn-primary" @click="handleEndTask">&#x23F9</button>
        <button class="btn btn-primary" @click="handlePauseTask">&#x23F8</button>
        <p>{{ formatTime(time) }}</p>
      </template>
      <template v-else-if="lapsed">
        <button class="btn btn-primary" @click="handleEndTask">&#x23F9</button>
        <button class="btn btn-primary" @click="handleStartTask">&#x23F5</button>
        <p>{{ formatTime(time) }}</p>
      </template>
      <template v-else>
        <button class="btn btn-primary" @click="handleStartTask">&#x23F5</button>
      </template>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/lib/utils';

export default {
  props: {
    subscription: Boolean,
    lapsed: Boolean,
    time: Number,
    name: String,
    project: String,
    duration: Number
  },
  emits: ['startTask', 'pauseTask', 'endTask', 'updateProject', 'updateName'],
  data() {
    return {
      localProject: this.project || '',
      // localName: this.name || '',
      localDuration: this.duration || 0,
      formatTime
    };
  },
  methods: {
    handleStartTask() {
      this.$emit('startTask', { project: this.project, name: this.name, duration: this.localDuration });
    },
    handlePauseTask() {
      this.$emit('pauseTask', { project: this.project, name: this.name, duration: this.localDuration });
    },
    handleEndTask() {
      this.$emit('endTask', { project: this.project, name: this.name, duration: this.localDuration });
    },
    updateProject(event) {
      this.$emit('updateProject', event.target.value);
    },
    updateName(event) {
      this.$emit('updateName', event.target.value);
    },
  }
};
</script>

<style scoped>
  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .new-task {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    padding: 20px;
    background: #009579;
  }
</style>
