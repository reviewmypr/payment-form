<script lang="ts">
  import Stepper from '$lib/components/Stepper.svelte';
</script>

<svelte:head>
  <title>Payment Form - Choose Your Plan</title>
  <meta name="description" content="Simple payment form with plan selection" />
</svelte:head>

<Stepper />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
