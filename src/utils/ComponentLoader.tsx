/* eslint-disable @typescript-eslint/no-explicit-any */
import loadable, { LoadableComponent, lazy } from '@loadable/component';

function ComponentLoaderMiddleware<T extends React.ComponentType<any>>(
  lazyComponent: () => Promise<any>,
  name: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    const hasRefresed = JSON.parse(
      window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
    );

    lazyComponent()
      .then((module) => {
        const component = module.default;
        window.sessionStorage.setItem(`retry-${name}-refreshed`, 'false');
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefresed) {
          window.sessionStorage.setItem(`retry-${name}-refreshed`, 'true');
          return window.location.reload();
        }
        reject(error);
      });
  });
}

export function Loadable<T extends React.ComponentType<any>>(
  importFunction: () => Promise<any>,
  name = 'lazy'
): LoadableComponent<T> {
  return loadable(() => ComponentLoaderMiddleware(importFunction, name));
}

export function Lazy<T extends React.ComponentType<any>>(
  importFunction: () => Promise<any>,
  name = 'lazy'
): LoadableComponent<T> {
  return lazy(() => ComponentLoaderMiddleware(importFunction, name));
}
