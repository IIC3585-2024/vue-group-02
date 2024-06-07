<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { useTaskStore } from '@/lib/db'



export default {
  extends: Bar,
  data() {
    const store = useTaskStore()
    const tasks = store.getTasks();

    function obtainProjectLabels() {
      let projectLabels = tasks.map(item => item.project)
      projectLabels = new Set(projectLabels)
      projectLabels = [...projectLabels.keys()]
      return projectLabels
    }

    function obtainProjectTimes(projectLabels) {
      let projectTimes = []
      projectLabels.forEach(element => {
        let time = 0
        tasks.forEach(task => {
          if (task.project == element) {
            const totalSeconds = Math.floor(task.duration / 1000)
            const totalMinutes = Math.floor(totalSeconds / 60);
            time += totalMinutes
          }
        })
        projectTimes.push(time)
      });
      return projectTimes
    }

    const chartData = {
        labels: obtainProjectLabels(),
        datasets: [
          {
            name: 'Minutos',
            values: obtainProjectTimes(obtainProjectLabels())
          }
        ]
      }

    const chartOptions = {
      responsive: true,
    }

    return {
      chartData,
      chartOptions
    }
  }
}
</script>