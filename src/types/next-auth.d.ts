import { DefaultSession } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  interface Session {
    user: {
      nickname: string;
      roles: string[];
      avatar: string;
    } & AdapterUser &
      DefaultSession['user'];
    access_token?: string;
    refresh_token?: string;
    accessTokenExpires: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      nickname: string;
      roles: string[];
      avatar: string;
    } & User &
      AdapterUser;
    access_token?: string;
    refresh_token?: string;
    accessTokenExpires: number;
  }
}
