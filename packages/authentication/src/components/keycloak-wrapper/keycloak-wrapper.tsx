import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak, {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';
import {FC, useState} from 'react';

interface KeycloakProps extends KeycloakConfig {
  children: React.ReactNode;
  redirectUri: string;
}

const KeycloakWrapper: FC<KeycloakProps> = ({children, url, clientId, realm, redirectUri}) => {
  const [keycloakClient] = useState(() => new (Keycloak as any)({url, clientId, realm}));
  const initOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad: 'login-required',
    flow: 'standard',
    redirectUri,
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloakClient}
      initOptions={initOptions}
      LoadingComponent={<div>Loading</div>}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export {KeycloakWrapper};
