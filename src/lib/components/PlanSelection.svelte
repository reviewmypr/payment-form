<script lang="ts">
  import { formStore, currentStep } from '$lib/stores/formStore';

  const plans = [
    {
      id: 'FREE',
      name: 'Free Plan',
      price: '$0',
      description: 'Perfect for getting started. Includes basic features and 5 projects.'
    },
    {
      id: 'PRO',
      name: 'Pro Plan',
      price: '$29/mo',
      description: 'Unlimited projects, priority support, and advanced analytics.'
    }
  ];

  function selectPlan(planId: string) {
    formStore.update(data => ({ ...data, plan: planId as 'FREE' | 'PRO' }));
    currentStep.set(planId === 'FREE' ? 2 : 1);
  }
</script>

<div class="plan-selection">
  <h2>Choose Your Plan</h2>
  <p class="subtitle">Select the plan that works best for you</p>
  
  <div class="plans-grid">
    {#each plans as plan}
      <button 
        class="plan-card" 
        on:click={() => selectPlan(plan.id)}
      >
        <h3>{plan.name}</h3>
        <p class="price">{plan.price}</p>
        <p class="description">{plan.description}</p>
        <span class="cta">Get Started →</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .plan-selection {
    text-align: center;
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .subtitle {
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }

  .plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .plan-card {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;

    &:hover {
      border-color: var(--accent-color);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
      transform: translateY(-4px);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }

  .price {
    font-size: 2rem;
    font-weight: bold;
    color: var(--accent-color);
    margin: 0.5rem 0;
  }

  .description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 1rem 0;
  }

  .cta {
    display: inline-block;
    margin-top: 1rem;
    color: var(--accent-color);
    font-weight: 600;
  }
</style>
