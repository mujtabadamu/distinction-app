import React, { useEffect, useRef } from 'react';
import { PUBLISHER_ID } from './adsConfig';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  adSlotType: string;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdBannerProps> = ({ adSlotType, style = {} }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      window.adsbygoogle = window.adsbygoogle || [];
    }

    const ins = adRef.current;
    if (!ins) return;

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.REACT_APP_ENV === 'development'
    ) {
      ins.setAttribute('data-adtest', 'on');
      console.log('AdSense running in TEST MODE');
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      ins.dataset.adsenseInitialized = 'true';
    } catch (error) {
      console.error('AdSense error:', error);
    }

    return () => {
      if (ins && ins.dataset.adsenseInitialized) {
        delete ins.dataset.adsenseInitialized;
      }
    };
  }, []);

  return (
    <div className="ad-container">
      {process.env.NODE_ENV === 'development' ||
      process.env.REACT_APP_ENV === 'development' ? (
        <div
          style={{
            backgroundColor: '#f0f0f0',
            padding: '8px',
            color: '#666',
            textAlign: 'center',
            fontSize: '12px',
          }}
        >
          AdSense Test Mode
        </div>
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={adSlotType}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdSense;
