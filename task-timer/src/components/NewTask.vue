<template>
  <div>
    <input type="text" class="form-control" id="projectName" v-model="localProject" placeholder="Proyecto">
    <input type="text" class="form-control" id="projectDescription" v-model="localName" placeholder="Nombre">
    <div class="controls">
      <button class="btn btn-primary" v-if="subscription" @click="handleEndTask">&#x23F9</button>
      <button class="btn btn-primary" v-if="subscription" @click="handlePauseTask">&#x23F8</button>
      <p v-if="subscription">{{ formatTime(time) }}</p>
      <button class="btn btn-primary" v-else-if="lapsed" @click="handleEndTask">&#x23F9</button>
      <button class="btn btn-primary" v-else-if="lapsed" @click="handleStartTask">&#x23F5</button>
      <p v-if="lapsed">{{ formatTime(time) }}</p>
      <button class="btn btn-primary" v-else @click="handleStartTask">&#x23F5</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subscription: Boolean,
    lapsed: Boolean,
    time: Number,
    name: String,
    project: String,
    duration: Number
  },
  emits: ['handleStartTask', 'handlePauseTask', 'handleEndTask'],
  data() {
    return {
      localProject: this.project || '',
      localName: this.name || '',
      localDuration: this.duration || 0
    };
  },
  methods: {
    handleStartTask() {
      this.$emit('handleStartTask', { project: this.localProject, name: this.localName, duration: this.localduration });
    },
    handlePauseTask() {
      this.$emit('handlePauseTask', { project: this.localProject, name: this.localName, duration: this.localduration });
    },
    handleEndTask() {
      this.$emit('handleEndTask', { project: this.localProject, name: this.localName, duration: this.localduration });
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
