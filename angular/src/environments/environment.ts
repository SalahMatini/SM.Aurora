import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Aurora',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44354/',
    redirectUri: baseUrl,
    clientId: 'Aurora_App',
    responseType: 'code',
    scope: 'offline_access Aurora',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44354',
      rootNamespace: 'SM.Aurora',
    },
  },
} as Environment;
