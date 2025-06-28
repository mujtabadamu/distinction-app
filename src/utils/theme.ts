const PrimaryTheme = '#1D4ED8';

interface ITheme {
  PrimaryColor: string;
  PrimaryDark: string;
  PrimaryGrey: string;
  SecondaryGrey: string;
  PrimaryInputOutline: string;
  PrimaryLight: string;
  PrimaryBorderColor: string;
  SecondaryBorderColor: string;
  PrimaryRadius: string;
  PrimaryRed: string;
  PrimaryOrange: string;
  PrimaryBlue: string;
  PrimaryGreen: string;
  noLabelUpperCase: boolean;
  PrimaryInactive: string;
  PrimaryFont: string;
  PrimaryFontSize: string;
  PrimaryTextColor: string;
  PrimaryFontColor: string;
  PrimarySurface: string;
  SecondarySurface: string;
  PrimaryFade: string;
  Incorrect: string;
  Correct: string;
  AccentRed: string;
  PrimaryShadow: string;
}

interface IColors {
  Grey700: string;
  Grey600: string;
  Grey500: string;
  BlueGrey900: string;
  LabelGrey: string;
}

export const Colors: IColors = {
  Grey700: '#424242',
  Grey600: '#757575',
  Grey500: '#9E9E9E',
  BlueGrey900: '#0F172A',
  LabelGrey: '#666F8D',
};

const Theme: ITheme = {
  PrimaryColor: PrimaryTheme,
  PrimaryDark: '#000500',
  PrimaryGrey: '#576574',
  SecondaryGrey: '#BDBDBD',
  PrimaryInputOutline: '#C6CADE',
  PrimaryLight: '#C8D6E5',
  PrimaryBorderColor: '#CBD5E4',
  SecondaryBorderColor: '#ECECEC',
  PrimaryRadius: '5px',
  PrimaryRed: '#fb5e9a',
  PrimaryOrange: '#E98B3A',
  PrimaryBlue: '#437DC1',
  PrimaryGreen: '#8FE2C9',
  noLabelUpperCase: true,
  PrimaryFont: "'Inter', sans-serif",
  PrimaryInactive: '#CCCCCC',
  PrimaryTextColor: '#424242',

  PrimaryFontSize: '13px',
  PrimaryFontColor: '#262E3D',

  PrimarySurface: '#26499D0D',
  SecondarySurface: '#f2f7fd',
  PrimaryFade: '#F9FAFB',

  // Result colors
  Incorrect: '#FB5E9A',
  Correct: '#8FE2C9',

  AccentRed: '#EDA8F0',

  PrimaryShadow:
    '0px 283px 113px rgba(199, 199, 199, 0.01), 0px 159px 95px rgba(199, 199, 199, 0.05), 0px 71px 71px rgba(199, 199, 199, 0.09), 0px 18px 39px rgba(199, 199, 199, 0.1), 0px 0px 0px rgba(199, 199, 199, 0.1)',
};

export default Theme;
