export default class TaskApi{
    static async getTasks(){
        return JSON.parse(localStorage.getItem("tasks") || "[]") ;
    }

    static async saveTasks(tasks){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}