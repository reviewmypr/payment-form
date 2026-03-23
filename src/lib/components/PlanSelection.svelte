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

  function selectPlan(planId: 'FREE' | 'PRO') {
    formStore.update(data => ({ ...data, plan: planId }));
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
    color: #1a1a1a;
  }

  .subtitle {
    color: #666;
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
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;

    &:hover {
      border-color: #6366f1;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
      transform: translateY(-4px);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
  }

  .price {
    font-size: 2rem;
    font-weight: bold;
    color: #6366f1;
    margin: 0.5rem 0;
  }

  .description {
    color: #666;
    font-size: 0.95rem;
    margin: 1rem 0;
  }

  .cta {
    display: inline-block;
    margin-top: 1rem;
    color: #6366f1;
    font-weight: 600;
  }
</style>
