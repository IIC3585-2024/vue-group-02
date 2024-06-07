<script setup>
  import Header from './components/Header.vue';
  import Body from './components/Body.vue';
  import BarChart from './components/BarChart.vue';

//   import Graph from './components/Graph.vue';

</script>

<template>
	<div class="main">
		<div class="container">

			<Header />

			<Body />

		</div>
		<BarChart />
	</div>
</template>

<style scoped>
    body {
			font-family: 'Helvetica Neue', sans-serif;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			background: #F2F6F8;
			color: #F2F6F8;
		}
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: #009579;
			border-radius: 5px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			padding: 20px;
			
		}
		.container h1 {
			margin: 0 0 10px;
		}
		.container p {
			margin: 0;
			color: #333;
		}
		.container a {
			color: #0070f3;
			text-decoration: none;
		}
		.container a:hover {
			text-decoration: underline;
		}
		.container img {
			margin-top: 20px;
			width: 100%;
			max-width: 300px;
		}
		.container img:hover {
			transform: scale(1.1);
		}
</style>
