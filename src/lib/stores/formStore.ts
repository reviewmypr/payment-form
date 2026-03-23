import { writable } from 'svelte/store';

export interface FormData {
  plan: 'FREE' | 'PRO' | null;
  address: string;
  phoneDigits: string;
  phoneFull: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const initialState: FormData = {
  plan: null,
  address: '',
  phoneDigits: '',
  phoneFull: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: ''
};

export const formStore = writable<FormData>(initialState);
export const currentStep = writable<number>(0);
export const isCompleted = writable<boolean>(false);
