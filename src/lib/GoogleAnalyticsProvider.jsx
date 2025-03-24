import React from 'react';
import Script from 'next/script';

const MEASUREMENT_ID = "G-MG7127BYGK";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='beforeInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}', {
              send_page_view: true,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;