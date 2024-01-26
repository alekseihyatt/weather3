<script>
	import Header from './Header.svelte';
	import './styles.css';
	import Three from '../components/Three.svelte';

</script>

<div>

	


	<Header />

	<Three />

	<main>
		<slot />
	</main>

	

	<footer>
	</footer>
</div>

<style>
	
</style>
