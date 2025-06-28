import React, { useState, useRef, useEffect } from 'react';

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  children: React.ReactNode;
  isOpen?: boolean;
}

export const Accordion = (props: AccordionProps) => {
  const {
    label,
    children,
    isOpen: controlledIsOpen = false,
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = useState(controlledIsOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(
    function syncingControlledOpenState() {
      setIsOpen(controlledIsOpen);
    },
    [controlledIsOpen]
  );

  useEffect(
    function handlingOpeningTransition() {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = isOpen
          ? `${contentRef.current.scrollHeight}px`
          : '0px';
      }
    },
    [isOpen]
  );

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div {...restProps}>
      <div onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
        {typeof label === 'function' ? label(isOpen) : label}
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: '0',
          overflow: 'scroll',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
