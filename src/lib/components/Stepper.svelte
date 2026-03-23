<script lang="ts">
  import { state } from '$lib/stores/formStore.svelte';
  import PlanSelection from './PlanSelection.svelte';
  import CheckoutForm from './CheckoutForm.svelte';
  import CompletionView from './CompletionView.svelte';
</script>

<div class="stepper">
  {#if state.isCompleted}
    <CompletionView />
  {:else if state.currentStep === 0}
    <PlanSelection />
  {:else if state.currentStep === 1}
    <CheckoutForm />
  {/if}
</div>

<style>
  .stepper {
    width: 100%;
    min-height: 100vh;
    background: var(--bg-primary);
    transition: background-color 0.3s ease;
  }
</style>
