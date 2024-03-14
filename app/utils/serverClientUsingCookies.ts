import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import amplifyConfig from '@/app/amplifyconfiguration.json';
import { cookies } from 'next/headers';

export const cookieBasedClient = generateServerClientUsingCookies({
  config: amplifyConfig,
  cookies
});