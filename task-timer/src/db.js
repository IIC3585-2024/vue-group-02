import { defineStore } from "pinia";

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: []
    }),
    actions: {
        getTasks(){
            return JSON.parse(localStorage.getItem("tasks") || "[]");
        },
        saveTasks(tasks){
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        getTask(id){
            return JSON.parse(localStorage.getItem("tasks") || "[]").find(task => task.id === id);
        },
        saveTask(task){
            const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            const index = tasks.findIndex(t => t.id === task.id);
            if(index !== -1){
                tasks[index] = task;
            }else{
                tasks.push(task);
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
});