import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import Theme from '../../../../utils/theme';
import { GoHistory } from 'react-icons/go';

interface DropdownProps {
  dataComponent: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ dataComponent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseOnResize = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleCloseOnResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleCloseOnResize);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <Button
        color="#FFF"
        fontColor={Theme.PrimaryBlue}
        iconLeft={<GoHistory />}
        onClick={toggleDropdown}
      >
        History
      </Button>
      {isOpen && <div className="dropdown-menu">{dataComponent}</div>}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  & .dropdown-menu {
    position: absolute;
    background: #fff;
    z-index: 3;
    right: 0;
    top: 50px;
    border-radius: 10px;
    padding: 10px;
    max-height: 250px;
    overflow-y: auto;
  }
`;
