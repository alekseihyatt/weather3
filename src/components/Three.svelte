<script>
  
  import { onMount} from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
  import { weatherList } from '../store.js';

  let rainSystem;
  let particleSystem;
  let scene;
  let weatherSubscription;

  onMount(() => {
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
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

      //SNOW START
      const initialPosition = new THREE.Vector3(14, 1, -11);

      const particleGeometry = new THREE.BufferGeometry();
      const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

      const particleCount = 50000;
      const particles = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Generate random cylindrical coordinates
        const radius = Math.random() * 11; // Adjust the radius of your cylinder
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const height = (Math.random() - 0.5) * 10; // Adjust the height of your cylinder

        // Convert cylindrical coordinates to Cartesian coordinates
        particles[i * 3] = radius * Math.cos(angle); // X position
        particles[i * 3 + 1] = height; // Y position
        particles[i * 3 + 2] = radius * Math.sin(angle); // Z position
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

      particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      particleSystem.position.copy(initialPosition);

      scene.add(particleSystem);
      //SNOW END

      //RAIN
      const secondPosition = new THREE.Vector3(8, 1, -11);

      const rainGeometry = new THREE.BufferGeometry();
      const rainMaterial = new THREE.PointsMaterial({ color: 0x3498db, size: 0.04 });

      const raindropCount = 20000;
      const raindrops = new Float32Array(raindropCount * 3);
      const raindropYVelocity = -0.1; // Constant Y velocity for downward movement

    for (let i = 0; i < raindropCount; i++) {
      raindrops[i * 3] = (Math.random() - 0.5) * 10;   // X position
      raindrops[i * 3 + 1] = Math.random() * 20;        // Y position
      raindrops[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z position
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(raindrops, 3));


      rainSystem = new THREE.Points(rainGeometry, rainMaterial);
      rainSystem.position.copy(secondPosition);

      scene.add(rainSystem);

      // Set a better camera position
      camera.position.set(-0.700, 1.263, -7.679);
      camera.lookAt(0.225, 1.289, -8.004); // Optional: Look at a specific point in the scene


   // const onMouseMove = (event) => {
   //   const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
   //   camera.rotation.y = mouseX * Math.PI;
   // };

   // window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      //SNOW ANIMATION
      particleSystem.rotation.y += 0.01;

      for (let i = 0; i < raindropCount; i++) {
        raindrops[i * 3 + 1] += raindropYVelocity;

        // Reset raindrops when they go below the scene
        if (raindrops[i * 3 + 1] < -5) {
          raindrops[i * 3 + 1] = 10; // Reset Y position to top
        }
      }



      rainGeometry.attributes.position.needsUpdate = true;


      renderer.render(scene, camera);
    };

    

    animate();


    weatherSubscription = weatherList.subscribeWeather((weather) => {
      if (weather.id === 500 || weather.id === 501 || weather.id === 502
       || weather.id === 503 || weather.id === 504 || weather.id === 511
       || weather.id === 520 || weather.id === 521 || weather.id === 522
       || weather.id === 502 || weather.id === 502 || weather.id === 502
       || weather.id === 531 || weather.id === 300 || weather.id === 301
       || weather.id === 302 || weather.id === 310 || weather.id === 311
       || weather.id === 312 || weather.id === 313 || weather.id === 314
       || weather.id === 321) {
        // Add rainSystem to the scene when weather ID is 500, 501, or 502
        scene.add(rainSystem);
      } else {
        // Remove rainSystem from the scene for other weather IDs
        scene.remove(rainSystem);
      }
    });

    weatherSubscription = weatherList.subscribeWeather((weather) => {
      if (weather.id === 600 || weather.id === 601 || weather.id === 602
       || weather.id === 611 || weather.id === 612 || weather.id === 613
       || weather.id === 615 || weather.id === 616 || weather.id === 620
       || weather.id === 621 || weather.id === 622) {
        // Add rainSystem to the scene when weather ID is 500, 501, or 502
        scene.add(particleSystem);
      } else {
        // Remove rainSystem from the scene for other weather IDs
        scene.remove(particleSystem);
      }
    });
    
    
  });

</script>

<div id="three-container"></div>

<style>
  #three-container {
    width: 100%;
    height: 100vh;
  }
</style>