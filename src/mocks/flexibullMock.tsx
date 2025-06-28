import React from 'react';

export const flexibullMocks = {
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Grid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Input: React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <input ref={ref} {...props} />
  )),
  Table: () => <table></table>,
  FlexiPagination: () => <div>Pagination</div>,
  EmptyState: () => <div>Empty State</div>,
  Spacer: () => <div>Spacer</div>,
  Modal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Select: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ModalBody: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ModalClose: () => <div>ModalClose</div>,
  ModalFooter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextArea: () => <textarea data-testid="textarea" />,
  Checkbox: () => <input type="checkbox" data-testid="checkbox" />,
  PageTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
};
