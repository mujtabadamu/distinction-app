export interface PreferenceState {
  preferredCurrency: PreferredCurrency;
}

export interface PreferredCurrency {
  label: 'USD' | 'NGN';
  value: 'USD' | 'NGN';
}
