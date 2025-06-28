import { useEffect } from 'react';
import { Box } from '@flexisaf/flexibull2';

const HeadwayWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.headwayapp.co/widget.js';
    document.head.appendChild(script);

    const config = {
      selector: '.headway-container',
      account: 'J1aRGJ',
      callbacks: {
        onWidgetReady: function () {
          const widgetItems =
            document.querySelectorAll<HTMLElement>('.HW_visible');
          if (widgetItems.length > 1) {
            for (let i = 1; i < widgetItems.length; i++) {
              widgetItems[i].remove();
            }
          }
        },
      },
    };
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Headway.init(config);
    };
  }, []);

  return (
    <Box
      display="flex"
      className="headway-container"
      style={{ alignItems: 'center', width: 'fit-content' }}
    >
      <div className="headway-badge" id="headway-badge"></div>
    </Box>
  );
};

export default HeadwayWidget;
