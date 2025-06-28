import AsyncSelect from 'react-select/async';

export type SelectOption = Partial<{
  label: string;
  value: string;
}>;

type SingleSelectProps = {
  value?: Partial<SelectOption> | null;
  onChange: (value: Partial<SelectOption> | null) => void;
};

type SelectProps = {
  options: SelectOption[];
  loading: boolean;
  placeholder: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onLoadMore: () => void;
} & SingleSelectProps;

export function AsyncSelectComponent({
  value,
  options,
  loading,
  placeholder,
  setSearchQuery,
  onLoadMore,
  onChange,
}: SelectProps) {
  const handleMenuScrollToBottom = () => {
    if (loading) return;
    onLoadMore();
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#a9bad3' : '#a9bad3',
      boxShadow: state.isFocused ? '0 0 0 1px #a9bad3' : 'none',
      '&:hover': {
        borderColor: '#a9bad3',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected
          ? '#e0e6ef'
          : provided.backgroundColor,
      color: state.isFocused || state.isSelected ? '#000' : provided.color,
      ':active': {
        ...provided[':active'],
        backgroundColor: '#e0e6ef',
        color: '#000',
      },
    }),
  };

  return (
    <AsyncSelect
      isClearable
      value={value}
      onChange={(newValue) => onChange(newValue)}
      loadOptions={(inputValue, callback) => {
        setSearchQuery(inputValue);
        callback(options);
      }}
      defaultOptions={options}
      isLoading={loading}
      placeholder={placeholder}
      styles={customStyles}
      cacheOptions
      onMenuScrollToBottom={handleMenuScrollToBottom}
    />
  );
}
