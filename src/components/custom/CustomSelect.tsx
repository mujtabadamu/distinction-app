import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export type SelectOption = Partial<{
  label: string;
  value: string;
}>;

type SelectProps = {
  options: SelectOption[];
  loading: boolean;
  placeholder: string;
  value?: Partial<SelectOption> | null;
  onChange: (value: Partial<SelectOption> | null) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onLoadMore: () => void;
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectInput = styled.input<{ isLoading: boolean }>`
  width: 100%;
  padding: 12px 16px;
  /* Add extra padding-right when loading to make room for loading dots + arrow/close button */
  padding-right: ${(props) => (props.isLoading ? '70px' : '40px')};
  border: 1px solid #a9bad3;
  border-radius: 4px;
  font-size: 14px; /* Prevents zoom on iOS */
  outline: none;
  background: white;
  height: 38px;
`;

const DropdownContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #a9bad3;
  padding: 10px 0px;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  margin-top: ${(props) => (props.isOpen ? '8px' : '0')};

  display: ${(props) => (props.isOpen ? 'block' : 'none')};

  /* Critical mobile scrolling properties */
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  overscroll-behavior: contain;
`;

const Option = styled.div<{ isSelected: boolean; isFocused: boolean }>`
  padding: 8px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#1D4ED8' : '#fff')};
  color: ${(props) => (props.isSelected ? '#fff' : 'inherit')};
  min-height: 25px; /* Better touch targets */
  display: flex;
  align-items: center;
  font-size: 12px;

  /* Mobile touch optimizations */
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    background-color: #e0e6ef;
  }

  &:active {
    background-color: #e0e6ef;
  }
`;

const LoadingSpinner = styled.div`
  padding: 12px 16px;
  text-align: center;
  color: #666;
`;

const NoOptions = styled.div`
  padding: 12px 16px;
  text-align: center;
  color: #666;
  font-style: italic;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ArrowButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: transform 0.2s ease;

  &:hover {
    color: #333;
  }

  /* Rotate arrow when dropdown is open */
  ${(props) => props.isOpen && 'transform: translateY(-50%) rotate(180deg);'}
`;

const LoadingDots = styled.div`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 2px;
  z-index: 1;

  .dot {
    width: 4px;
    height: 4px;
    background-color: #666;
    border-radius: 50%;
    animation: loadingDots 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) {
    animation-delay: -0.32s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  .dot:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes loadingDots {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export function CustomSelect({
  options,
  loading,
  placeholder,
  value,
  onChange,
  searchQuery,
  setSearchQuery,
  onLoadMore,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    onChange(option);
    setIsOpen(false);
    setFocusedIndex(-1);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClear = () => {
    onChange(null);
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // Load more when scrolled to bottom
    if (scrollHeight - scrollTop <= clientHeight + 10 && !loading) {
      onLoadMore();
    }
  };

  const displayValue = value?.label || searchQuery || '';

  return (
    <SelectContainer>
      <div style={{ position: 'relative' }}>
        <SelectInput
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          autoComplete="off"
          isLoading={loading}
        />
        {loading && (
          <LoadingDots>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </LoadingDots>
        )}
        {!value && (
          <ArrowButton type="button" onClick={handleArrowClick} isOpen={isOpen}>
            <svg
              height="14"
              width="14"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                fill="#aab5c6"
              ></path>
            </svg>
          </ArrowButton>
        )}
        {value && (
          <CloseButton type="button" onClick={handleClear}>
            ×
          </CloseButton>
        )}
      </div>

      <DropdownContainer
        ref={dropdownRef}
        isOpen={isOpen}
        onScroll={handleScroll}
      >
        {loading && <LoadingSpinner>Loading...</LoadingSpinner>}

        {!loading && options.length === 0 && (
          <NoOptions>No options found</NoOptions>
        )}

        {options.map((option, index) => (
          <Option
            key={`${option.value}-${index}`}
            ref={(el) => (optionRefs.current[index] = el)}
            isSelected={value?.value === option.value}
            isFocused={focusedIndex === index}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </Option>
        ))}
      </DropdownContainer>
    </SelectContainer>
  );
}
