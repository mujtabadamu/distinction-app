import { Loader, Box } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';

interface IProps {
  width?: string;
  height?: string;
}

const SectionLoader = ({ width = '100%', height = '80vh' }: IProps) => {
  return (
    <Box width={width} height={height}>
      <Loader section={true} color={Theme.PrimaryColor} />
    </Box>
  );
};
export default SectionLoader;
