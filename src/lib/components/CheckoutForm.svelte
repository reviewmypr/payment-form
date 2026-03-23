<script lang="ts">
  import { formStore, currentStep, isCompleted } from '$lib/stores/formStore';
  import { PhoneInput } from '@desource/phone-mask-svelte';
  import '@desource/phone-mask-svelte/assets/lib.css';
  import type { PMaskPhoneNumber } from '@desource/phone-mask-svelte';

  let errors: Record<string, string> = {};

  function validateForm(): boolean {
    errors = {};
    
    if (!$formStore.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!$formStore.phoneDigits.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!$formStore.cardNumber.replace(/\s/g, '') || $formStore.cardNumber.replace(/\s/g, '').length < 13) {
      errors.cardNumber = 'Valid card number is required';
    }
    if (!$formStore.cardExpiry.trim()) {
      errors.cardExpiry = 'Expiry date is required';
    }
    if (!$formStore.cardCVC.trim()) {
      errors.cardCVC = 'CVC is required';
    }

    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validateForm()) {
      isCompleted.set(true);
      currentStep.set(2);
    }
  }

  function handlePhoneChange(value: PMaskPhoneNumber) {
    formStore.update(data => ({ ...data, phoneDigits: value.digits, phoneFull: value.full }));
  }

  function handleCardNumberInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, '');
    
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    formStore.update(data => ({ ...data, cardNumber: value }));
  }

  function handleExpiryInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    formStore.update(data => ({ ...data, cardExpiry: value }));
  }

  function handleCVCInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 4);
    
    formStore.update(data => ({ ...data, cardCVC: value }));
  }

  function goBack() {
    currentStep.set(0);
  }
</script>

<div class="checkout-form">
  <button class="back-btn" on:click={goBack}>← Back</button>
  
  <h2>Complete Your Details</h2>
  <p class="subtitle">Secure payment information for PRO plan</p>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        type="text"
        placeholder="123 Main St, City, State, ZIP"
        bind:value={$formStore.address}
        aria-invalid={!!errors.address}
      />
      {#if errors.address}
        <span class="error">{errors.address}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="phone">Phone Number</label>
      <PhoneInput
        bind:value={$formStore.phoneDigits}
        onchange={handlePhoneChange}
        theme="auto"
        showCopy={true}
        showClear={true}
        class={`phone-input-field ${errors.phone ? 'phone-input-error' : ''}`}
      />
      {#if errors.phone}
        <span class="error">{errors.phone}</span>
      {/if}
    </div>

    <div class="card-section">
      <h3>Card Details</h3>
      
      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          value={$formStore.cardNumber}
          on:input={handleCardNumberInput}
          aria-invalid={!!errors.cardNumber}
        />
        {#if errors.cardNumber}
          <span class="error">{errors.cardNumber}</span>
        {/if}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="cardExpiry">Expiry (MM/YY)</label>
          <input
            id="cardExpiry"
            type="text"
            placeholder="12/25"
            maxlength="5"
            value={$formStore.cardExpiry}
            on:input={handleExpiryInput}
            aria-invalid={!!errors.cardExpiry}
          />
          {#if errors.cardExpiry}
            <span class="error">{errors.cardExpiry}</span>
          {/if}
        </div>

        <div class="form-group">
          <label for="cardCVC">CVC</label>
          <input
            id="cardCVC"
            type="text"
            placeholder="123"
            maxlength="4"
            value={$formStore.cardCVC}
            on:input={handleCVCInput}
            aria-invalid={!!errors.cardCVC}
          />
          {#if errors.cardCVC}
            <span class="error">{errors.cardCVC}</span>
          {/if}
        </div>
      </div>
    </div>

    <button type="submit" class="submit-btn">Complete Purchase</button>
  </form>
</div>

<style>
  .checkout-form {
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .back-btn {
    background: none;
    border: none;
    color: var(--accent-color);
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .subtitle {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.95rem;
  }

  input {
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background-color: var(--bg-secondary);
    color: var(--text-primary);

    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    &[aria-invalid="true"] {
      border-color: var(--error-color);
    }
  }

  .error {
    color: var(--error-color);
    font-size: 0.85rem;
  }

  .card-section {
    margin-top: 1rem;
  }

  .card-section h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .submit-btn {
    background: var(--accent-color);
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 1rem;

    &:hover {
      background: var(--accent-hover);
    }
  }

  /* PhoneInput styling */
  :global(.phone-input-field .phone-input[data-theme='dark']) {
    --pi-bg: var(--bg-secondary);
    --pi-fg: var(--text-primary);
    --pi-border: var(--border-color);
    --pi-border-focus: var(--accent-color);
  }

  :global(.phone-input-field .phone-input) {
    --pi-bg: var(--bg-secondary);
    --pi-fg: var(--text-primary);
    --pi-border: var(--border-color);
    --pi-border-focus: var(--accent-color);
  }

  :global(.phone-input-error .phone-input) {
    --pi-border: var(--error-color);
  }
</style>
