<script module lang="ts">
  export interface FormData {
    plan: 'FREE' | 'PRO' | null;
    address: string;
    phone: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
  }

  export const state = $state({
    formData: {
      plan: null,
      address: '',
      phone: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    } as FormData,
    currentStep: 0,
    isCompleted: false
  });

  export function resetForm() {
    state.formData = {
      plan: null,
      address: '',
      phone: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    };
    state.currentStep = 0;
    state.isCompleted = false;
  }
</script>
