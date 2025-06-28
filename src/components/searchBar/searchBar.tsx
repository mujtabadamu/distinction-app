import { Box, Loader, Spacer } from '@flexisaf/flexibull2';
import debounce from 'lodash/debounce';

import styled from 'styled-components';
import Theme from 'utils/theme';
import { Duration } from 'utils/constants';

const ICON_SIZE = 16;
const ICON_COLOR = '#889fc1';

type SearchBarProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  debounceInterval?: number;
  isSearching?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: React.ReactElement;
  isDisabled?: boolean;
  style?: React.CSSProperties;
};

const StyledInput = styled.input`
  background: 'none';
  border: '1px solid #ccc';
  border: none;
  width: 100%;
  outline: none;
  background: transparent;
  :disabled {
    background: ${Theme.SecondaryGrey};
  }
`;

const flexibullLabelStyles: Partial<React.CSSProperties> = {
  position: 'absolute',
  display: 'block',
  top: '-20px',
};

export const SearchBar = (props: SearchBarProps) => {
  const {
    value,
    onChange,
    placeholder,
    label,
    debounceInterval = Duration.Short,
    isDisabled,
    onFocus,
    onBlur,
    defaultValue,
    isSearching = false,
    style = {},
  } = props;

  const debouncedOnChange = debounce(onChange, debounceInterval);

  return (
    <Box
      onFocus={onFocus}
      onBlur={onBlur}
      display="flex"
      style={{
        position: 'relative',
        alignItems: 'center',
        borderRadius: '6px',
        backgroundColor: isDisabled ? Theme.SecondaryGrey : 'white',
        justifyContent: 'space-between',
        border: `1px solid ${Theme.PrimaryBorderColor}`,
        padding: '.7em',
        ...style,
      }}
    >
      {label && (
        <>
          <label style={flexibullLabelStyles}> {label}</label>
          <Spacer space={8} />
        </>
      )}

      <StyledInput
        type="text"
        placeholder={placeholder}
        disabled={isDisabled}
        defaultValue={defaultValue ?? value}
        onChange={(evt) => debouncedOnChange(evt.target.value)}
      />
      <span className="pl-2 grid place-items-center">
        {isSearching ? (
          <Loader size={20} color={Theme.SecondaryGrey} />
        ) : (
          <i
            className="saf-search-normal-1 bold"
            style={{ fontSize: ICON_SIZE, color: ICON_COLOR }}
          />
        )}
      </span>
    </Box>
  );
};
