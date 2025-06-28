interface ITextProps {
  size: string;
  block?: boolean;
  bold?: boolean;
  color?: string;
  uppercase?: boolean;
}

interface IFontSize {
  h1: ITextProps;
  h2: ITextProps;
  h3: ITextProps;
  h4: ITextProps;
  h5: ITextProps;
  h6: ITextProps;
  caption: ITextProps;
  subtext: ITextProps;
  accordionLabel: ITextProps;
  comingSoonText: ITextProps;
  templateIconLarge: ITextProps;
}

const fontSize: IFontSize = {
  h1: { size: '1.6rem', block: true, bold: true },
  h2: { size: '1.5rem', block: true },
  h3: { size: '1.2rem', bold: true },
  h4: { size: '1.2rem' },
  h5: { size: '1rem', bold: true },
  h6: { size: '.9rem', bold: true },
  caption: { size: '0.8rem', color: '#8893A6' },
  subtext: { size: '32px', uppercase: true },
  accordionLabel: { size: '.9rem', bold: false },
  comingSoonText: { size: '30px', bold: true, color: '#3A61E91A' },
  templateIconLarge: { size: '40px' },
};

export default fontSize;
