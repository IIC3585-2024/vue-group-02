<template>
    <tr class="task" >
        <td>{{project}}</td>
        <td>{{name}}</td>
        <td>{{formatTime(duration)}}</td>
        <td>
            <button class="btn btn-primary" @click="triggerEdit">&#9658</button>
            <button class="btn btn-primary" @click="triggerDelete">X</button>
        </td>
    </tr>
</template>

<script>
export default {
  props: {
    id: String,
    project: String,
    name: String,
    duration: Number
  },
  emits: ['handleDeleteTask', 'handleEditTask'],
  methods: {
    triggerDelete() {
      this.$emit('handleDeleteTask', { id: this.id });
    },
    triggerEdit() {
      this.$emit('handleEditTask', { id: this.id, project: this.project, name: this.name, duration: this.duration });
    }
  }
};
</script>

<style scoped>
  td {
    border: 1px  dashed gray;
    padding: 10px;
  }

  table tr:last-child td {
    border-bottom: 0;
  }
  table tr td:first-child {
    border-left: 0;
  }
  table tr td:last-child {
    border-right: 0;
  }
</style>