<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { useTaskStore } from '@/lib/db'
import { ref, onMounted, computed, watch } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Bar
  },
  setup() {
    const store = useTaskStore();
    const tasks = ref([]);

    onMounted(async () => {
      tasks.value = await store.getTasks();
    });

    function obtainProjectLabels() {
      const projectLabels = tasks.value.map(item => item.project);
      return [...new Set(projectLabels)];
    }

    function obtainProjectTimes(projectLabels) {
      return projectLabels.map(project => {
        const totalMinutes = tasks.value
          .filter(task => task.project === project)
          .reduce((sum, task) => sum + Math.floor(task.duration / 60000), 0);
        return totalMinutes;
      });
    }

    watch(
      () => store.tasks,
      (newTasks) => {
        tasks.value = newTasks;
      },
      { deep: true }
    );

    const chartData = computed(() => {
      const labels = obtainProjectLabels();
      const data = obtainProjectTimes(labels);

      return {
        labels,
        datasets: [
          {
            label: 'Minutos',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
    });

    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    return {
      chartData,
      chartOptions
    };
  }
}
</script>