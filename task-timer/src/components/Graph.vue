<template>
    <Bar class="chart" :data="chartData" :options="chartOptions" />
</template>
  
<script>
  import { ref } from 'vue';
  import Bar from './Bar.vue';
  
  export default({
    components: {
      Bar
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const chartData = ref(props.data);
      const chartOptions = ref(props.options);
  
      return {
        chartData,
        chartOptions
      };
    }
  });
</script>