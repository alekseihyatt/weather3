<!-- src/components/ThreeScene.svelte -->
<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three-container").appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create DRACOLoader
    const dracoLoader = new DRACOLoader();
    
    // Set paths to the Draco files
    dracoLoader.setDecoderPath('/models/');
    dracoLoader.setDecoderConfig({ wasmUrl: '/models/draco_decoder.wasm' });

    // Pass DRACOLoader instance to GLTFLoader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/src/lib/Atelier.glb',
      (gltf) => {
        // Once the model is loaded, add it to the scene
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model', error);
      }
    );

    loader.load(
    '/src/lib/KS_Sky.glb',
    (gltf) => {
      // Once the second model is loaded, add it to the scene
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error('Error loading second GLB model', error);
    }
  );

     // Set a better camera position
    camera.position.set(-0.700, 1.763, -7.679);
    camera.lookAt(0.225, 1.789, -8.004); // Optional: Look at a specific point in the scene

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<div id="three-container"></div>

<style>
  #three-container {
    width: 100%;
    height: 100vh;
  }
</style>