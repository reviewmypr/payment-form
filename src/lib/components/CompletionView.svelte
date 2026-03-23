<script lang="ts">
  import { onMount } from 'svelte';
  import { resetForm } from '$lib/stores/formStore.svelte';

  let fireworks = $state<Array<{ id: number; x: number; y: number; startTime: number }>>([]);
  let nextId = $state(0);

  onMount(() => {
    // Generate fireworks on mount
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        fireworks.push({
          id: nextId++,
          x: Math.random() * 100,
          y: Math.random() * 60 + 20,
          startTime: Date.now()
        });
        fireworks = fireworks; // Trigger reactivity
      }, i * 150);
    }

    // Cleanup function
    return () => {
      // Cleanup on component destroy
    };
  });

  function handleReset() {
    resetForm();
    window.location.href = '/';
  }

  function isFireworkActive(startTime: number): boolean {
    return Date.now() - startTime < 1200; // 1.2 seconds
  }

  $effect(() => {
    // Remove completed fireworks
    const active = fireworks.filter(f => isFireworkActive(f.startTime));
    if (active.length !== fireworks.length) {
      fireworks = active;
    }
  });
</script>

<div class="completion-container">
  <div class="fireworks-container">
    {#each fireworks as firework (firework.id)}
      <div 
        class="firework"
        style="--x: {firework.x}%; --y: {firework.y}%;"
      >
        {#each [0, 1, 2, 3, 4] as i}
          <span class="spark spark-{i}"></span>
        {/each}
      </div>
    {/each}
  </div>

  <div class="content">
    <div class="checkmark">✓</div>
    <h1>All Done!</h1>
    <p class="message">Your payment has been processed successfully.</p>
    <p class="details">Thank you for choosing our service. Get ready to experience amazing features!</p>
    
    <button class="reset-btn" onclick={handleReset}>Start Over</button>
  </div>
</div>

<style>
  .completion-container {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  }

  .fireworks-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .firework {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 8px;
    height: 8px;
    pointer-events: none;
  }

  .spark {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    left: 0;
    top: 0;
  }

  .spark-0 {
    background: #ffd700;
    animation: burst 1.2s ease-out forwards;
    --angle: 0deg;
  }

  .spark-1 {
    background: #ff69b4;
    animation: burst 1.2s ease-out 0.1s forwards;
    --angle: 72deg;
  }

  .spark-2 {
    background: #00ff00;
    animation: burst 1.2s ease-out 0.2s forwards;
    --angle: 144deg;
  }

  .spark-3 {
    background: #00bfff;
    animation: burst 1.2s ease-out 0.3s forwards;
    --angle: 216deg;
  }

  .spark-4 {
    background: #ff1493;
    animation: burst 1.2s ease-out 0.4s forwards;
    --angle: 288deg;
  }

  @keyframes burst {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(cos(var(--angle)) * 120px),
        calc(sin(var(--angle)) * 120px)
      );
      opacity: 0;
    }
  }

  .content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    animation: slideUp 0.6s ease-out;
  }

  .checkmark {
    font-size: 80px;
    margin-bottom: 1rem;
    animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  h1 {
    font-size: 3.5rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
    animation: fadeIn 0.8s ease-out 0.2s both;
  }

  .message {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .details {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .reset-btn {
    background: white;
    color: var(--gradient-start);
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
    animation: fadeIn 0.8s ease-out 0.8s both;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
