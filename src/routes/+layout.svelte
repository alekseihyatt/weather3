<script>
	import Header from './Header.svelte';
	import './styles.css';

	import CustomCursor from '../components/CustomCursor.svelte';

	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(event) {
   	 mouseX = event.clientX;
   	 mouseY = event.clientY;
  }
</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="app" on:mousemove={handleMouseMove}>

	<CustomCursor x={mouseX} y={mouseY} />


	<Header />

	
	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
