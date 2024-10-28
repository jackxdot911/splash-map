import React, { useState, useMemo, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  useAuthRequest,
  exchangeCodeAsync,
  revokeAsync,
  ResponseType,
  AccessTokenRequestConfig,
  makeRedirectUri, // Import this
} from 'expo-auth-session';
import { Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const clientId = '6878lk42lk73vv8a7jr4uspknk'; // Replace with your client ID
const userPoolUrl = 'https://nick.auth.us-east-1.amazoncognito.com';
const redirectUri = makeRedirectUri({ scheme: 'myapp' }); // Update this

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export default function App(): JSX.Element {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  
  const discoveryDocument = useMemo(() => ({
    authorizationEndpoint: `${userPoolUrl}/oauth2/authorize`,
    tokenEndpoint: `${userPoolUrl}/oauth2/token`,
    revocationEndpoint: `${userPoolUrl}/oauth2/revoke`,
  }), []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      responseType: ResponseType.Code,
      redirectUri,
      usePKCE: true,
    },
    discoveryDocument
  );

  useEffect(() => {
    const exchangeFn = async (exchangeTokenReq: AccessTokenRequestConfig) => {
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(exchangeTokenReq, discoveryDocument);
        setAuthTokens(exchangeTokenResponse as AuthTokens);
        await SecureStore.setItemAsync('authTokens', JSON.stringify(exchangeTokenResponse));

        router.push('/map');
      } catch (error) {
        const errorMessage = (error as Error).message || 'Unable to exchange token';
        Alert.alert('Token exchange error', errorMessage);
      }
    };

    if (response) {
      if ('error' in response) {
        const errorDescription = response.params.error_description || 'Something went wrong';
        Alert.alert('Authentication error', errorDescription);
        return;
      }
      if (response.type === 'success') {
        exchangeFn({
          clientId,
          code: response.params.code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier || '',
          },
        });
      }
    }
  }, [discoveryDocument, request, response]);

  const logout = async () => {
    if (authTokens) {
      await revokeAsync(
        {
          clientId,
          token: authTokens.refreshToken,
        },
        discoveryDocument
      );
      await SecureStore.deleteItemAsync('authTokens');
      setAuthTokens(null);
    }
  };

  console.log('authTokens: ' + JSON.stringify(authTokens));

  return authTokens ? (
    <Button title="Logout" onPress={logout} />
  ) : (
    <Button disabled={!request} title="Login" onPress={() => promptAsync()} />
  );
}
