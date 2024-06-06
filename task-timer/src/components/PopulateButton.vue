<template>
    <button @click="importTasks">Importar Tareas de Ejemplo</button>
</template>

<script>
    import { importExampleTasks } from '@/lib/utils';

    export default {
        emits: ['importTasks'],
        methods: {
            async importTasks() {
                const exampleTasks = await importExampleTasks();
                alert('Tareas de ejemplo importadas');
                this.$emit('importTasks', {
                    exampleTasks: exampleTasks
                });
            }
        }
    };
</script>

<style scoped>
  button {
	background-color:#00957a;
	border-radius:10px;
	border:2px solid #ffffff;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-size:15px;
	font-weight:bold;
	padding:15px 14px;
	text-decoration:none;
  }

  button:hover {
	background-color:#117964;
  }

  button:active {
	position:relative;
	top:1px;
  }
</style>  