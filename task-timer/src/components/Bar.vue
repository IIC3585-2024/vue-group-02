<template>
    <div class="chart-container">
      <Bar :chartData="chartData" :options="chartOptions" />
    </div>
</template>
  
<script>
  import { Bar } from 'vue-chartjs'
  
  export default {
    name: 'Bar',
    props: {
      data: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    computed: {
      chartData() {
        return {
          labels: this.data.labels,
          datasets: this.data.datasets
        }
      },
      chartOptions() {
        return this.options
      }
    }
  }
</script>
  
<style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>