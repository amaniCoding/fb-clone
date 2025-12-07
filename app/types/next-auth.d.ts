// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
declare module "next-auth" {
  /**
   * User type (returned from authorize callback)
   */
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    // Add any other custom fields
  }

  /**
   * Session type
   */
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    // Add session-level custom claims
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT token type
   */
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  }
}
