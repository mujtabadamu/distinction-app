import { Colors } from './src/utils/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-grey-900': Colors.BlueGrey900,
        'label-grey': Colors.LabelGrey,
      },
      fontSize: {
        smaller: '12px',
      },
    },
  },
  plugins: [],
};
