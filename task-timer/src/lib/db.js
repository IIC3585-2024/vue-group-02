import { defineStore } from "pinia";

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),
  actions: {
    getTasks() {
      return this.tasks;
    },
    saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.tasks = tasks;
    },
    getTask(id) {
      return this.tasks.find(task => task.id === id);
    },
    saveTask(task) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      } else {
        this.tasks.push(task);
      }
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(id) {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    }
  }
});