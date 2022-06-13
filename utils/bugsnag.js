import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import getConfig from 'next/config';
import React from 'react';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

Bugsnag.start({
  apiKey:
    serverRuntimeConfig.BUGSNAG_API_KEY ||
    publicRuntimeConfig.BUGSNAG_API_KEY ||
    'Set Bugsnag API key to log exceptions',
  plugins: [new BugsnagPluginReact(React)],
  enabledReleaseStages: ['production'],
});

export default Bugsnag;
