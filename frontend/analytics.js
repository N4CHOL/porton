import ReactGA from 'react-ga4';

const trackingId = 'G-DTF3BPLV20'; // Google Analytics tracking ID
ReactGA.initialize(trackingId);

export const trackPageView = (page) => {
  ReactGA.send({ hitType: 'pageview', page });
};