<!-- <template>
  <Bar class="chart" :data="chartData" :options="chartOptions" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { computed, ref, watch } from 'vue'
import { useTaskStore } from '@/lib/db'

export default {
  components: {
    Bar
  },
  setup() {
    const store = useTaskStore()
    const tasks = computed(() => store.getTasks())
    const chartData = ref({
      labels: [],
      datasets: []
    })
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }

    watch(tasks, (newTasks) => {
      const labels = obtainProjectLabels(newTasks)
      chartData.value = {
        labels,
        datasets: [
          {
            label: "Seconds",
            backgroundColor: '#009579',
            data: obtainProjectTimes(newTasks, labels)
          }
        ]
      }
    }, { immediate: true })

    function obtainProjectLabels(tasks) {
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
            time += Math.floor(task.duration / 1000)
          }
        })
        projectTimes.push(time)
      });
      return projectTimes
    }

    return {
      chartData,
      chartOptions
    }
  }
}
</script>

<style scoped>
.chart {
  max-width: 100%;
  margin: 0 auto;
}
</style> -->
