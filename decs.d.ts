declare module '@flexisaf/flexibull2';
declare module '@flexisaf/flexibull2/*';
declare module '@tinymce/tinymce-react';
declare module 'html2pdf.js';
declare module '*.xlsx' {
  const value: any;
  export default value;
}

type DefaultNumberOfQuestions = 'default' | 'custom';
type Mode = 'real' | 'learning';
type SubscriptionType = 'NETWORK' | 'PAYSTACK' | 'STRIPE';
// type PlatformType = 'NETWORK' | 'PAYSTACK' | 'STRIPE';
