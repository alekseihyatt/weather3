<script>
    export let x = 0;
    export let y = 0;
  </script>
  
  <style>
    /* Add your custom cursor styles here */
    .custom-cursor {
      position: fixed;
      width: 24px;
      height: 24px;
      background-color: #ff0000; /* Set your desired color */
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }

    :global(body) {
		cursor: none;
	}
    
  </style>
  
  <div class="custom-cursor" style="left: {x}px; top: {y}px;"></div>