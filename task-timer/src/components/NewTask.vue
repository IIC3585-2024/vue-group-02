<template>
  <div>
    <input type="text" class="form-control" id="projectName" v-model="localProject" placeholder="Proyecto">
    <input type="text" class="form-control" id="projectDescription" v-model="localName" placeholder="Nombre">
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
  emits: ['startTask', 'pauseTask', 'endTask'],
  data() {
    return {
      localProject: this.project || '',
      localName: this.name || '',
      localDuration: this.duration || 0,
      formatTime
    };
  },
  methods: {
    handleStartTask() {
      this.$emit('startTask', { project: this.localProject, name: this.localName, duration: this.localduration });
    },
    handlePauseTask() {
      this.$emit('pauseTask', { project: this.localProject, name: this.localName, duration: this.localduration });
    },
    handleEndTask() {
      this.$emit('endTask', { project: this.localProject, name: this.localName, duration: this.localduration });
      this.project = '';
      this.name = '';
      this.duration = 0;
    }
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
</style>
