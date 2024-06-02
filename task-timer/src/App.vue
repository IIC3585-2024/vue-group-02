<script setup>
  import Header from './components/Header.vue';
  import Body from './components/Body.vue';
  import Graph from './components/Graph.vue';
  import { tasks } from './tasks';
  import TaskApi from './TasksAPI';

  function obtainProjectLabels(tasks){
    let projectLabels = tasks.map(item => item.project)
    projectLabels = new Set(projectLabels)
    projectLabels = [...projectLabels.keys()]
    return projectLabels

  }

  function obtainProjectTimes(projectLabels){
    let projectTimes = []
    projectLabels.forEach(element => {
      let time = 0
      $tasks.forEach(task =>{
        if (task.project == element){
            time += Math.floor(task.duration / 1000)
        }
      }
      )
      projectTimes.push(time)
    });
    return projectTimes
  }

  onMount(async () => {
        $tasks = await TaskApi.getTasks();
    });

    console.log(obtainProjectLabels($tasks))
    console.log(obtainProjectTimes(obtainProjectLabels($tasks)))



    $: data = {
    labels: obtainProjectLabels($tasks),
    datasets: [
      {
        name:"segundos",
        values: obtainProjectTimes(obtainProjectLabels($tasks))
      }
    ]
    
    };
    
    $: options = {
    height: 300,
    colors: ['#009579', '#009579'],
    axisOptions: {
      xAxisMode: "tick",
      yAxisMode: "tick",
      xIsSeries: true
    }
  };

</script>

<template>
  <div class="main">
    <div class="container">
      <Header />
      <Body />

    </div>
    <Chart
    :data="data"
    :options="options"
    />
  </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    background: #009579;
  }
  .main{
        max-height: 100vh;
  }

  :global(.container *) {
    font-family: "Quicksand", sans-serif;
  }
</style>
