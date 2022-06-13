import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ErrorFallback } from 'components/ErrorFallback';
import { CartProvider } from 'context/cart';
import { ProductProvider } from 'context/product';
import { UserProvider } from 'context/user';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import theme from 'styles/theme';
import 'typeface-montserrat';
import Bugsnag from 'utils/bugsnag';
import * as gtag from 'utils/gtag';

const ErrorBoundary =
  Bugsnag.getPlugin('react')?.createErrorBoundary(React) ??
  ((props) => <React.Fragment {...props}>{props.children}</React.Fragment>);

function SafeHydrate({ children, ssr }) {
  return ssr ? (
    children
  ) : (
    <div suppressHydrationWarning style={{ height: '100%' }}>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

function Plebshop({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>Plebshop ⚡️</title>
        <meta name="description" content="Bitcoin POS" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SafeHydrate ssr={false}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UserProvider>
              <ProductProvider>
                <CartProvider>
                  <Component {...pageProps} />
                </CartProvider>
              </ProductProvider>
            </UserProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </SafeHydrate>
    </>
  );
}
export default Plebshop;
