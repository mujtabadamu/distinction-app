import { createPortal } from 'react-dom';
import { Layout } from '@flexisaf/flexibull2';
import Theme from 'utils/theme';

/**
 * Renders a React element to a portal, wrapped in Flexibull Layout and Theme.
 * @param element The React element to render inside the portal
 * @param container The DOM node to render into (default: document.body)
 */
export function renderThemedPortal(
  element: React.ReactNode,
  container: Element = document.body
) {
  return createPortal(<Layout theme={Theme}>{element}</Layout>, container);
}
