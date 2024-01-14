<script>
	export let isOpen = false;
    

  function closeModal() {
    isOpen = false;
  }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if isOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()}>
      
      <div class="modal-body">
        <!-- Use a slot to inject dynamic content -->
        <slot></slot>
      </div>
    </div>
  </div>
{/if}

