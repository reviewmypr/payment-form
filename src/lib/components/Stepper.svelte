<script lang="ts">
  import { currentStep, isCompleted } from '$lib/stores/formStore';
  import PlanSelection from './PlanSelection.svelte';
  import CheckoutForm from './CheckoutForm.svelte';
  import CompletionView from './CompletionView.svelte';
</script>

<div class="stepper">
  {#if $isCompleted}
    <CompletionView />
  {:else if $currentStep === 0}
    <PlanSelection />
  {:else if $currentStep === 1}
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
