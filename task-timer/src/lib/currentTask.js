import { defineStore } from "pinia";

export const useCurrentTaskStore = defineStore('currentTask', {
    state: () => ({
        currentTask: []
    }),
    actions: {
        getCurrentTask(){
            return JSON.parse(localStorage.getItem("currentTask") || "{}");
        },
        saveCurrentTask(currentTask){
            localStorage.setItem("currentTask", JSON.stringify(currentTask));
        }
    }
});